import { useContext, useEffect, useState } from "react";
import { GeolocationContext } from "../../../context/GeolocationContext";
import Maps from "../../../components/Maps/Maps";
import GoogleMapsButton from "../../../components/GoogleMapsButton/GoogleMapsButton";
import WazeButton from "../../../components/WazeButton/WazeButton";
import Button from "../../../components/Button/Button";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import type { MapMouseEvent } from "maplibre-gl";
import Opinions from "../../../components/Opinions/Opinions";
import { Formik } from "formik";

const GarageDetail = () => {
  const {latitude, longitude} = useContext(GeolocationContext);
  const [latitudeToGo, setLatitudeToGo] = useState<null | number>(null);
  const [longitudeToGo, setLongitudeToGo] = useState<null | number>(null);
  const [markerSelected, setMarkerSelected] = useState<null | string>(null);
  const [initialValues, setInitialValues] = useState({
    idUser: 1,
    idGarage: 1,
    rating: 0,
    comment: "",
  });

  return (
    <MainContainer>
      <div className="lg:flex md:flex">
        <div className="px-4 py-2 md:w-1/2 lg:w-1/2 sm:w-full">
          <h1 className="lg:text-4xl md:text-4xl text-2xl font-bold text-left">
            Taller Jefferson Gutierritos
          </h1>
          <h2 className="text-md font-medium text-left">
            Taller de mecánica automotriz, especializado en la reparación y mantenimiento de vehículos.
          </h2>
          <p className="text-sm text-left mt-3">
            Taller Jefferson Gutierritos es un taller mecánico especializado en la reparación y mantenimiento de vehículos. Con años
            de experiencia en el sector, ofrecemos servicios de alta calidad para garantizar el óptimo funcionamiento de su automóvil.
            Nuestro equipo de mecánicos altamente capacitados está listo para atender cualquier problema que pueda tener su vehículo.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Información de contacto:</h3>
            <p className="text-sm">Teléfono: <a href="tel:+50312345678" className="text-blue-500 hover:underline">+503 1234 5678</a></p>
            <p className="text-sm">Correo electrónico: <a href="mailto:jefferson.guitierritos@gmail.com" className="text-blue-500 hover:underline">
              jefferson.guitierritos@gmail.com
            </a></p>
            <p className="text-sm">Dirección: Calle Principal, Colonia Ejemplo, San Salvador, El Salvador</p>
          </div>
          <div className="mt-4">
            <Opinions idGarage={1} />
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                console.log("Enviando reseña:", values);
                // Aquí puedes enviar la reseña al servidor
                resetForm();
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Escribir reseña</h3>
                  <div className="flex flex-col space-y-2">
                    <input
                      type="number"
                      name="rating"
                      value={values.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      placeholder="Calificación (1-5)"
                      className="p-2 border border-gray-300 rounded"
                    />
                    <textarea
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      placeholder="Escribe tu comentario aquí..."
                      className="p-2 border border-gray-300 rounded h-24"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Enviar Reseña
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="px-4 py-2 md:w-1/2 lg:w-1/2 sm:w-full ">
          <Maps longitude={longitude} latitude={latitude} width="100%" height="70vh" marker
          mapMarkers={[{
            latitude: latitudeToGo ?? latitude,
            longitude: longitudeToGo ?? longitude,
            title: "Taller Jefferson Gutierritos",
            action: () => {
              // setLatitudeToGo(13.7034);
              // setLongitudeToGo(-89.2034);
              // setMarkerSelected("Taller Jefferson Gutierritos");
            }
          }]} />
          <div className="flex mt-4">
            <div className="flex flex-3/4 flex-col items-start">
                <h3 className="text-lg font-semibold">Ubicación seleccionada:</h3>
                <p className="flex-1/4 text-sm">
                  Taller Jefferson Gutierritos
                </p>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <GoogleMapsButton origin={`${latitude},${longitude}`} destination={`${latitudeToGo ?? 0},${longitudeToGo ?? 0}`} />
            <WazeButton longitude={longitudeToGo ?? 0} latitude={latitudeToGo ?? 0} />
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default GarageDetail;