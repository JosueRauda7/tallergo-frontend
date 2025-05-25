import { useContext, useEffect } from "react";
import { GeolocationContext, type GeolocationContextType } from "./context/GeolocationContext";
import Menu from "./components/Menu/Menu";
import MainContainer from "./components/Layout/MainContainer/MainContainer";

function App() {
  const {latitude, longitude, getCurrentPosition} = useContext<GeolocationContextType>(GeolocationContext);

  useEffect(() => {
    getCurrentPosition();
  }, [latitude, longitude, getCurrentPosition]);

  return (
    <>
      <Menu />
      <MainContainer>
      </MainContainer>
    </>
  )
}

export default App
