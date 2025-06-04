import { use, useContext, useEffect } from "react";
import { GeolocationContext, type GeolocationContextType } from "./context/GeolocationContext";
import Menu from "./components/Menu/Menu";
import { LoginContext } from "./context/LoginContext";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import GarageDetail from "./pages/Garage/GarageDetail/GarageDetail";
import Register from "./pages/Register/Register";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Admin from "./pages/Admin/Admin";
import Footer from "./components/Footer/Footer";
import AdminGarages from "./pages/Admin/AdminGarages/AdminGarages";
import FormGarage from "./pages/Admin/AdminGarages/FormGarage/FormGarage";
import { ToastContainer } from "react-toastify";
import Garage from "./pages/Garage/Garage/Garage";
import AdminGaragesTypes from "./pages/Admin/AdminGaragesTypes/AdminGaragesTypes";
import FormGaragesTypes from "./pages/Admin/AdminGaragesTypes/FormGaragesTypes/FormGaragesTypes";

function App() {
  const {latitude, longitude, getCurrentPosition} = useContext<GeolocationContextType>(GeolocationContext);
  const {isLoggedIn} = useContext(LoginContext);

  useEffect(() => {
    getCurrentPosition();
  }, [latitude, longitude, getCurrentPosition]);

  // if (!isLoggedIn) {
  //   return (
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/registrarse" element={<Register />} />
  //     </Routes>
  //   );
  // }

  return (
    <>
      <Menu />
      <div className="min-h-dvh">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/inicio" element={<Home />}/>
          <Route path="/talleres" element={<Garage />}/>
          <Route path="/talleres/:idGarage" element={<GarageDetail />}/>
          <Route path="/acerca-de" element={<AboutUs />} />
          <Route path="/contactanos" element={<ContactUs />} />
          <Route path="/administrar" element={<Admin />} />
          <Route path="/administrar/tipos-talleres" element={<AdminGaragesTypes />} />
          <Route path="/administrar/tipos-talleres/nuevo" element={<FormGaragesTypes />} />
          <Route path="/administrar/tipos-talleres/:id" element={<FormGaragesTypes />} />
          <Route path="/administrar/talleres" element={<AdminGarages />} />
          <Route path="/administrar/talleres/nuevo" element={<FormGarage />} />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
