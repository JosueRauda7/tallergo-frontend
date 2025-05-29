import { useContext, useEffect } from "react";
import { GeolocationContext, type GeolocationContextType } from "./context/GeolocationContext";
import Menu from "./components/Menu/Menu";
import MainContainer from "./components/Layout/MainContainer/MainContainer";
import { LoginContext } from "./context/LoginContext";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  const {latitude, longitude, getCurrentPosition} = useContext<GeolocationContextType>(GeolocationContext);
  const {isLoggedIn} = useContext(LoginContext);

  useEffect(() => {
    getCurrentPosition();
  }, [latitude, longitude, getCurrentPosition]);

  // if (!isLoggedIn) {
  //   return (
  //     <Login />
  //   );
  // }

  return (
    <>
      <Menu />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </MainContainer>
    </>
  )
}

export default App
