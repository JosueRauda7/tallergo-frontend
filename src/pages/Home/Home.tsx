import { useContext } from "react";
import Maps from "../../components/Maps/Maps";
import GoogleMapsButton from "../../components/GoogleMapsButton/GoogleMapsButton";
import WazeButton from "../../components/WazeButton/WazeButton";
import { GeolocationContext } from "../../context/GeolocationContext";

const Home = () => {
  const {latitude, longitude} = useContext(GeolocationContext);

  return (
    <div className="lg:flex md:flex">
      <div className="px-4 py-2 md:w-1/2 lg:w-1/2 sm:w-full">
        <h1 className="lg:text-4xl md:text-4xl sm: text-2xl font-bold text-left">
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
        <Maps longitude={-89.12497} latitude={13.72674} width="100%" height="80vh" marker title="Casa" />
        <div className="flex justify-center mt-2">
          <GoogleMapsButton origin={`${latitude},${longitude}`} destination="13.72674,-89.12497" />
          <WazeButton longitude={longitude} latitude={latitude} />
        </div>
      </div>
    </div>
  );
};

export default Home;