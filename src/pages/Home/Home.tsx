import { useContext, useState } from "react";
import { GeolocationContext } from "../../context/GeolocationContext";
import MainContainer from "../../components/Layout/MainContainer/MainContainer";
import { Link } from "react-router-dom";
import Maps from "../../components/Maps/Maps";
import Button from "../../components/Button/Button";
import GoogleMapsButton from "../../components/GoogleMapsButton/GoogleMapsButton";
import WazeButton from "../../components/WazeButton/WazeButton";

const Home = () => {
  const {latitude, longitude} = useContext(GeolocationContext);
  const [latitudeToGo, setLatitudeToGo] = useState<null | number>(null);
  const [longitudeToGo, setLongitudeToGo] = useState<null | number>(null);
  const [markerSelected, setMarkerSelected] = useState<null | string>(null);

  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Bienvenido a TallerGO</h1>
        <p className="text-md text-center mt-2">
          Encuentra el mejor servicio mecánico cerca de ti.
        </p>
        <Link to="/talleres" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Buscar Talleres
        </Link>
      </div>
      <div className="mt-6 py-6 bg-gray-200 rounded-2xl shadow-lg shadow-gray-400">
        <h1 className="text-4xl font-bold text-center">Talleres cercanos a ti</h1>
        <div className="mt-4 p-2">
          <div className="px-4">
              <h3 className="text-2xl font-bold">Ubicación seleccionada:</h3>
              <p className="text-lg">
                {markerSelected ? markerSelected : "Seleccione un taller en el mapa."}
              </p>
          </div>
          <div className="flex-1/4 flex justify-end">
            <GoogleMapsButton origin={`${latitude},${longitude}`} destination={`${latitudeToGo ?? 0},${longitudeToGo ?? 0}`}
              disabled={
                latitudeToGo === null || longitudeToGo === null || latitude === null || longitude === null
              }
            />
            <WazeButton longitude={longitudeToGo ?? 0} latitude={latitudeToGo ?? 0} 
              disabled={
                latitudeToGo === null || longitudeToGo === null || latitude === null || longitude === null
              }
            />
            <Button
              onClick={() => {
                setLatitudeToGo(null);
                setLongitudeToGo(null);
                setMarkerSelected(null);
              }}
              disabled={latitudeToGo === null && longitudeToGo === null}
              className="disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:text-gray-400 bg-red-500 hover:bg-red-400 active:bg-red-600 shadow-neutral-400 shadow"
            >Cancelar</Button>
          </div>
        </div>
        <div className="mt-4 px-4">
          <Maps longitude={longitude} latitude={latitude} width="100%" height="70vh" marker
            mapMarkers={[{
              latitude: latitudeToGo ?? 13.717612393670544,
              longitude: longitudeToGo ?? -89.12733824970488,
              title: `
                <p class="text-lg mb-1"><b>Taller Jefferson Gutierritos</b></p>
                <p class="text-sm mb-1">Taller especializado en mecánica general y electrónica automotriz.</p>
                <p class="text-xs">Calle Principal, Colonia Ejemplo, San Salvador, El Salvador</p>
              `,
              action: () => {
                setLatitudeToGo(13.717612393670544);
                setLongitudeToGo(-89.12733824970488);
                setMarkerSelected("Taller Jefferson Gutierritos");
              }
          },{
            latitude: 13.7034,
            longitude: -89.2034,
            title: `
              <p class="text-lg mb-1"><b>Taller Mecánico El Salvador</b></p>
              <p class="text-sm mb-1">Servicio de mecánica general y electrónica automotriz.</p>
              <p class="text-xs">Avenida Libertad, San Salvador, El Salvador</p>
            `,
            action: () => {
              setLatitudeToGo(13.7034);
              setLongitudeToGo(-89.2034);
              setMarkerSelected("Taller Mecánico El Salvador");
            }
          }]} />
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;