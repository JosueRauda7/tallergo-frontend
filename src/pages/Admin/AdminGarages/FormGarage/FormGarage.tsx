import { Formik } from "formik";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer"
import { useContext, useEffect, useState } from "react";
import { GeolocationContext } from "../../../../context/GeolocationContext";
import { useNavigate } from "react-router-dom";
import Maps, { type MapMarker } from "../../../../components/Maps/Maps";
import type { MapMouseEvent } from "maplibre-gl";
import { toast } from "react-toastify";

const FormGarage = () => {
  const navigate = useNavigate();

  const { latitude, longitude } = useContext(GeolocationContext);


  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  });

  const [geolocation, setGeolocation] = useState<{latitude: null | number, longitude: null | number}>({
    latitude: null,
    longitude: null,
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">Agregar Taller</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              if (!geolocation.latitude || !geolocation.longitude) {
                toast.error("Por favor, selecciona una ubicación en el mapa.", {
                  position: "bottom-right",
                });
              }
            }}
            validate={(values) => {
              const errors: any = {};
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
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                <form onSubmit={handleSubmit} className="space-y-4 px-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.address && touched.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.phone && touched.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.description && touched.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="bg-blue-700 text-white mr-2 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/administrar/talleres');
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400 cursor-pointer"
                    >Cancelar</button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
        <div className="">
          <Maps longitude={longitude} latitude={latitude} width="100%" height="70vh" marker
            tapMarker
            tapOutAction={(e: MapMouseEvent) => {
              setGeolocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
            }}
          />
          <div className="flex mt-4">
            <div className="flex flex-3/4 flex-col items-start">
                <h3 className="text-lg font-semibold">Ubicación de taller seleccionada:</h3>
                <p className="flex-1/4 text-sm">
                  <b>Latitud:</b> {geolocation.latitude ? geolocation.latitude : "Ubicar en el mapa."}
                </p>
                <p className="flex-1/4 text-sm">
                  <b>Longitud:</b> {geolocation.longitude ? geolocation.longitude : "Ubicar en el mapa."}
                </p>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default FormGarage;