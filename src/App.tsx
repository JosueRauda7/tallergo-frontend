import Maps from "./components/Maps/Maps"
import GoogleMapsButton from "./components/GoogleMapsButton/GoogleMapsButton";
import { useContext, useEffect } from "react";
import { GeolocationContext, type GeolocationContextType } from "./context/GeolocationContext";
import WazeButton from "./components/WazeButton/WazeButton";

function App() {
  const {latitude, longitude, getCurrentPosition} = useContext<GeolocationContextType>(GeolocationContext);

  useEffect(() => {
    getCurrentPosition();
  }, [latitude, longitude, getCurrentPosition]);

  return (
    <>
      <Maps longitude={-89.12497} latitude={13.72674} marker title="Casa" />
      <GoogleMapsButton origin={`${latitude},${longitude}`} destination="13.72674,-89.12497" />
      <WazeButton longitude={longitude} latitude={latitude} />
    </>
  )
}

export default App
