import { useContext, useState } from "react";
import { GeolocationContext } from "../../../context/GeolocationContext";
import Maps from "../../../components/Maps/Maps";
import GoogleMapsButton from "../../../components/GoogleMapsButton/GoogleMapsButton";
import WazeButton from "../../../components/WazeButton/WazeButton";
import Button from "../../../components/Button/Button";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import type { MapMouseEvent } from "maplibre-gl";

const GarageDetail = () => {
  const {latitude, longitude} = useContext(GeolocationContext);
  const [latitudeToGo, setLatitudeToGo] = useState<null | number>(null);
  const [longitudeToGo, setLongitudeToGo] = useState<null | number>(null);
  const [markerSelected, setMarkerSelected] = useState<null | string>(null);

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
        </div>
        <div className="px-4 py-2 md:w-1/2 lg:w-1/2 sm:w-full ">
          <Maps longitude={longitude} latitude={latitude} width="100%" height="70vh" marker localLotationAction={() => {
            // setLatitudeToGo(null);
            // setLongitudeToGo(null);
            // setMarkerSelected(null);
          }}
          tapOutAction={() => {
            // setLatitudeToGo(null);
            // setLongitudeToGo(null);
            // setMarkerSelected(null);
          }}
          mapMarkers={[{
            latitude: latitudeToGo ?? latitude,
            longitude: longitudeToGo ?? longitude,
            title: "Taller Jefferson Gutierritos",
            action: () => {
              setLatitudeToGo(13.7034);
              setLongitudeToGo(-89.2034);
              setMarkerSelected("Taller Jefferson Gutierritos");
            }
          }]} />
          <div className="flex mt-4">
            <div className="flex flex-3/4 flex-col items-start">
                <h3 className="text-lg font-semibold">Ubicación seleccionada:</h3>
                <p className="flex-1/4 text-sm">
                  {markerSelected ? markerSelected : "Seleccione un taller en el mapa."}
                </p>
            </div>
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
          <div className="flex justify-center mt-2">
            <GoogleMapsButton origin={`${latitude},${longitude}`} destination={`${latitudeToGo ?? 0},${longitudeToGo ?? 0}`} disabled={
              latitudeToGo === null || longitudeToGo === null || latitude === null || longitude === null
            } />
            <WazeButton longitude={longitudeToGo ?? 0} latitude={latitudeToGo ?? 0} disabled={
              latitudeToGo === null || longitudeToGo === null || latitude === null || longitude === null
            } />
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default GarageDetail;