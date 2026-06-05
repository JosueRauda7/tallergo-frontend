import {Formik} from "formik";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import {useContext, useEffect, useState} from "react";
import {GeolocationContext} from "../../../../context/GeolocationContext";
import {useNavigate, useParams} from "react-router-dom";
import Maps, {type MapMarker} from "../../../../components/Maps/Maps";
import type {MapMouseEvent} from "maplibre-gl";
import {toast} from "react-toastify";
import axios from "axios";

const FormGarage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [bussinessData, setBussinessData] = useState<any>([]);
  const [garagesTypesData, setGaragesTypeData] = useState<any>([]);
  const {latitude, longitude} = useContext(GeolocationContext);

  const [initialValues, setInitialValues] = useState({
    bussinessId: "",
    garageTypeId: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  });

  const [geolocation, setGeolocation] = useState<{
    latitude: null | number;
    longitude: null | number;
  }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const fetchBussiness = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/empresas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setBussinessData(data);
    };

    const fetchGaragesTypes = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tipo-talleres`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setGaragesTypeData(data);
    };

    fetchBussiness();
    fetchGaragesTypes();
  }, []);

  useEffect(() => {
    const fetchGarage = async () => {
      if (id) {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/talleres/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.status === 200) {
          setInitialValues({
            bussinessId: res.data.empresa.id,
            garageTypeId: res.data.tipoTaller.id,
            name: res.data.nombre,
            address: res.data.direccion,
            phone: res.data.telefono,
            email: res.data.email,
            description: res.data.descripcion,
          });
          setGeolocation({
            latitude: res.data.latitud,
            longitude: res.data.longitud,
          });
        }
      }
    };

    fetchGarage();
  }, [id]);

  return (
    <MainContainer>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        <div className=''>
          <h1 className='text-4xl font-bold px-4 mb-4'>
            {id ? "Editar" : "Nuevo"} Taller
          </h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values) => {
              if (!geolocation.latitude || !geolocation.longitude) {
                toast.error("Por favor, selecciona una ubicación en el mapa.", {
                  position: "bottom-right",
                });
              }
              if (!id) {
                axios
                  .post(
                    `${import.meta.env.VITE_API_URL}/talleres`,
                    {
                      empresa: {id: values.bussinessId},
                      tipotaller: {id: values.garageTypeId},
                      nombre: values.name,
                      direccion: values.address,
                      telefono: values.phone,
                      email: values.email,
                      descripcion: values.description,
                      latitud: geolocation.latitude,
                      longitud: geolocation.longitude,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    },
                  )
                  .then((res) => {
                    if (res.status === 201) {
                      toast.success("Taller creado exitosamente", {
                        position: "bottom-right",
                      });
                      navigate("/administrar/talleres");
                    }
                  })
                  .catch((err) => {
                    console.error("Error al crear el taller:", err);
                  });
              } else {
                axios
                  .put(
                    `${import.meta.env.VITE_API_URL}/talleres/${id}`,
                    {
                      empresa: {id: values.bussinessId},
                      tipoTaller: {id: values.garageTypeId},
                      nombre: values.name,
                      direccion: values.address,
                      telefono: values.phone,
                      email: values.email,
                      descripcion: values.description,
                      latitud: geolocation.latitude,
                      longitud: geolocation.longitude,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    },
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      toast.success("Taller actualizado exitosamente", {
                        position: "bottom-right",
                      });
                      navigate("/administrar/talleres");
                    }
                  })
                  .catch((err) => {
                    console.error("Error al actualizar el taller:", err);
                  });
              }
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.bussinessId) {
                errors.bussinessId = "La empresa es requerida";
              }
              if (!values.garageTypeId) {
                errors.garageTypeId = "El tipo de taller es requerido";
              }
              if (!values.name) {
                errors.name = "El nombre es requerido";
              }
              if (!values.address) {
                errors.address = "La dirección es requerida";
              }
              if (!values.phone) {
                errors.phone = "El teléfono es requerido";
              }
              if (!values.email) {
                errors.email = "El email es requerido";
              } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "El email no es válido";
              }
              return errors;
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                <form onSubmit={handleSubmit} className='space-y-4 px-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Empresa
                    </label>
                    <select
                      name='bussinessId'
                      value={values.bussinessId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.bussinessId && touched.bussinessId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}>
                      <option value=''>Seleccione una empresa</option>
                      {bussinessData.map((bussiness: any) => (
                        <option key={bussiness.id} value={bussiness.id}>
                          {bussiness.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.bussinessId && touched.bussinessId && (
                      <p className='text-red-500 text-sm'>
                        {errors.bussinessId}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mt-2'>
                      Tipo de Taller
                    </label>
                    <select
                      name='garageTypeId'
                      value={values.garageTypeId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.garageTypeId && touched.garageTypeId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}>
                      <option value=''>Seleccione un tipo de taller</option>
                      {garagesTypesData.map((garageType: any) => (
                        <option key={garageType.id} value={garageType.id}>
                          {garageType.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.garageTypeId && touched.garageTypeId && (
                      <p className='text-red-500 text-sm'>
                        {errors.garageTypeId}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Nombre
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.name && touched.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.name && touched.name && (
                      <p className='text-red-500 text-sm'>{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Dirección
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.address && touched.address ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.address && touched.address && (
                      <p className='text-red-500 text-sm'>{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Teléfono
                    </label>
                    <input
                      type='text'
                      name='phone'
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.phone && touched.phone && (
                      <p className='text-red-500 text-sm'>{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.email && touched.email && (
                      <p className='text-red-500 text-sm'>{errors.email}</p>
                    )}
                  </div>
                  <div className='flex items-center justify-end'>
                    <button
                      type='submit'
                      className='bg-blue-700 text-white mr-2 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'>
                      Guardar
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        navigate("/administrar/talleres");
                      }}
                      className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400 cursor-pointer'>
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
        <div className=''>
          <Maps
            longitude={longitude}
            latitude={latitude}
            width='100%'
            height='70vh'
            marker
            tapMarker={
              geolocation.latitude && geolocation.longitude ? false : true
            }
            tapOutAction={(e: MapMouseEvent) => {
              setGeolocation({latitude: e.lngLat.lat, longitude: e.lngLat.lng});
            }}
            mapMarkers={
              geolocation.latitude && geolocation.longitude
                ? [
                    {
                      longitude: geolocation.longitude,
                      latitude: geolocation.latitude,
                      title: "Ubicación de la empresa",
                      action: () => {},
                    },
                  ]
                : []
            }
          />
          <div className='flex mt-4'>
            <div className='flex flex-3/4 flex-col items-start'>
              <h3 className='text-lg font-semibold'>
                Ubicación de taller seleccionada:
              </h3>
              <p className='flex-1/4 text-sm'>
                <b>Latitud:</b>{" "}
                {geolocation.latitude
                  ? geolocation.latitude
                  : "Ubicar en el mapa."}
              </p>
              <p className='flex-1/4 text-sm'>
                <b>Longitud:</b>{" "}
                {geolocation.longitude
                  ? geolocation.longitude
                  : "Ubicar en el mapa."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default FormGarage;
