import {useContext, useEffect, useState} from "react";
import {GeolocationContext} from "../../../context/GeolocationContext";
import Maps from "../../../components/Maps/Maps";
import GoogleMapsButton from "../../../components/GoogleMapsButton/GoogleMapsButton";
import WazeButton from "../../../components/WazeButton/WazeButton";
import Button from "../../../components/Button/Button";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import type {MapMouseEvent} from "maplibre-gl";
import Opinions from "../../../components/Opinions/Opinions";
import {Formik} from "formik";
import axios from "axios";
import {useParams} from "react-router-dom";

const GarageDetail = () => {
  const {idGarage} = useParams();
  const {latitude, longitude} = useContext(GeolocationContext);
  const [latitudeToGo, setLatitudeToGo] = useState<null | number>(null);
  const [longitudeToGo, setLongitudeToGo] = useState<null | number>(null);
  const [markerSelected, setMarkerSelected] = useState<null | string>(null);
  const [initialValues, setInitialValues] = useState({
    idUser: 1,
    idGarage: 1,
    rating: "",
    comment: "",
  });
  const [taller, setTaller] = useState(null);
  const [rowsReviews, setRowsReviews] = useState([]);

  useEffect(() => {
    // console.log(idGarage);
    const fetchGarage = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/talleres/${idGarage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const reviewsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/opiniones?idtaller=${idGarage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setRowsReviews(reviewsRes.data);
        // console.log("Garage data:", res.data);
        setTaller(res.data);
        setLatitudeToGo(res.data.latitud);
        setLongitudeToGo(res.data.longitud);
      } catch (error) {
        console.error("Error fetching garage:", error);
      }
    };

    fetchGarage();
  }, []);

  const handleRefreshReviews = async () => {
    const reviewsRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/opiniones?idtaller=${idGarage}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    setRowsReviews(reviewsRes.data);
    // Aquí puedes actualizar el estado con las nuevas opiniones
  };

  return (
    <MainContainer>
      <div className='lg:flex md:flex'>
        <div className='px-4 py-2 md:w-1/2 lg:w-1/2 sm:w-full'>
          <h1 className='lg:text-4xl md:text-4xl text-2xl font-bold text-left'>
            {taller ? taller.nombre : "Cargando..."}
          </h1>
          <h2 className='text-md font-medium text-left'>
            {taller ? taller.empresa.nombre : "Cargando..."}
          </h2>
          {/* <p className='text-sm text-left mt-3'>
            Categoría: {taller ? taller.tipoTaller.nombre : "Cargando..."}
          </p> */}
          <div className='mt-4'>
            <h3 className='text-lg font-semibold'>Información de contacto:</h3>
            <p className='text-sm'>
              Teléfono:{" "}
              <a
                href={`tel:+${taller ? taller.telefono : "Cargando..."}`}
                className='text-blue-500 hover:underline'>
                +503 {taller ? taller.telefono : "Cargando..."}
              </a>
            </p>
            <p className='text-sm'>
              Correo electrónico:{" "}
              <a
                href={`mailto:${taller ? taller.email : "Cargando..."}`}
                className='text-blue-500 hover:underline'>
                {taller ? taller.email : "Cargando..."}
              </a>
            </p>
            <p className='text-sm'>
              Dirección: {taller ? taller.direccion : "Cargando..."}
            </p>
          </div>
          <div className='mt-4'>
            <Opinions idGarage={1} reviews={rowsReviews} />
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, {resetForm}) => {
                // console.log("Enviando reseña:", values);
                await axios.post(
                  `${import.meta.env.VITE_API_URL}/opiniones`,
                  {
                    idtaller: idGarage,
                    estrellas: values.rating,
                    comentarios: values.comment,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  },
                );
                await handleRefreshReviews();
                // Aquí puedes enviar la reseña al servidor
                resetForm();
              }}>
              {({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit} className='mt-4'>
                  <h3 className='text-lg font-bold mb-2'>Escribir reseña</h3>
                  <div className='flex flex-col space-y-2'>
                    <input
                      type='number'
                      name='rating'
                      value={values.rating}
                      onChange={handleChange}
                      min='1'
                      max='5'
                      placeholder='Calificación (1-5)'
                      className='p-2 border border-gray-300 rounded'
                    />
                    <textarea
                      name='comment'
                      value={values.comment}
                      onChange={handleChange}
                      placeholder='Escribe tu comentario aquí...'
                      className='p-2 border border-gray-300 rounded h-24'
                    />
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                      Enviar Reseña
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className='px-4 py-2 md:w-1/2 lg:w-1/2 sm:w-full '>
          <div className='flex mt-4'>
            <div className='flex flex-3/4 flex-col items-start'>
              <h3 className='text-lg font-semibold'>Ubicación seleccionada:</h3>
              <p className='flex-1/4 text-sm'>
                {taller ? taller.direccion : "Cargando..."}
              </p>
            </div>
          </div>
          <div className='flex justify-center mt-2 mb-3'>
            <GoogleMapsButton
              origin={`${latitude},${longitude}`}
              destination={`${latitudeToGo ?? 0},${longitudeToGo ?? 0}`}
            />
            <WazeButton
              longitude={longitudeToGo ?? 0}
              latitude={latitudeToGo ?? 0}
            />
          </div>
          <Maps
            longitude={longitude}
            latitude={latitude}
            width='100%'
            height='70vh'
            marker
            mapMarkers={[
              {
                latitude: latitudeToGo ?? latitude,
                longitude: longitudeToGo ?? longitude,
                title: taller ? taller.nombre : "Cargando...",
                action: () => {
                  // setLatitudeToGo(13.7034);
                  // setLongitudeToGo(-89.2034);
                  // setMarkerSelected("Taller Jefferson Gutierritos");
                },
              },
            ]}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default GarageDetail;
