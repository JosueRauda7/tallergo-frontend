import { useContext, useEffect } from "react";
import { GeolocationContext, type GeolocationContextType } from "./context/GeolocationContext";
import Menu from "./components/Menu/Menu";
import { LoginContext } from "./context/LoginContext";
import Login from "./pages/Login/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import Bussiness from "./pages/Admin/Bussiness/Bussiness";
import FormBussiness from "./pages/Admin/Bussiness/FormBussiness/FormBussiness";
import UserTypes from "./pages/Admin/UserTypes/UserTypes";
import FormUserTypes from "./pages/Admin/UserTypes/FormUserTypes/FormUserTypes";
import Users from "./pages/Admin/Users/Users";
import FormUsers from "./pages/Admin/Users/FormUsers/FormUsers";
import Categories from "./pages/Admin/Categories/Categories";
import FormCategorie from "./pages/Admin/Categories/FormCategorie/FormCategorie";
import SubCategories from "./pages/Admin/SubCategories/SubCategories";
import FormSubCategorie from "./pages/Admin/SubCategories/FormSubCategorie/FormSubCategorie";
import Services from "./pages/Admin/Services/Services";
import FormService from "./pages/Admin/Services/FormService/FormService";
import Products from "./pages/Admin/Products/Products";
import FormProduct from "./pages/Admin/Products/FormProduct/FormProduct";
import Promociones from "./pages/Admin/Promociones/Promociones";
import FormPromocion from "./pages/Admin/Promociones/FormPromocion/FormPromocion";
import Etiquetas from "./pages/Admin/Etiquetas/Etiquetas";
import FormEtiqueta from "./pages/Admin/Etiquetas/FormEtiqueta/FormEtiqueta";

function App() {
  const {latitude, longitude, getCurrentPosition} = useContext<GeolocationContextType>(GeolocationContext);
  const {isLoggedIn} = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentPosition();
  }, [latitude, longitude, getCurrentPosition]);

  if (!isLoggedIn) {
    if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/registrarse') {
      navigate('/');
    }
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
      </Routes>
    );
  }

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
          <Route path="/administrar/empresas" element={<Bussiness />} />
          <Route path="/administrar/empresas/nuevo" element={<FormBussiness />} />
          <Route path="/administrar/empresas/:id" element={<FormBussiness />} />
          <Route path="/administrar/tipos-talleres" element={<AdminGaragesTypes />} />
          <Route path="/administrar/tipos-talleres/nuevo" element={<FormGaragesTypes />} />
          <Route path="/administrar/tipos-talleres/:id" element={<FormGaragesTypes />} />
          <Route path="/administrar/talleres" element={<AdminGarages />} />
          <Route path="/administrar/talleres/nuevo" element={<FormGarage />} />
          <Route path="/administrar/talleres/:id" element={<FormGarage />} />
          <Route path="/administrar/tipo-usuarios/" element={<UserTypes />} />
          <Route path="/administrar/tipo-usuarios/nuevo" element={<FormUserTypes />} />
          <Route path="/administrar/tipo-usuarios/:id" element={<FormUserTypes />} />
          <Route path="/administrar/usuarios/" element={<Users />} />
          <Route path="/administrar/usuarios/nuevo" element={<FormUsers />} />
          <Route path="/administrar/usuarios/:id" element={<FormUsers />} />
          <Route path="/administrar/categorias/" element={<Categories />} />
          <Route path="/administrar/categorias/nuevo" element={<FormCategorie />} />
          <Route path="/administrar/categorias/:id" element={<FormCategorie />} />
          <Route path="/administrar/sub-categorias/" element={<SubCategories />} />
          <Route path="/administrar/sub-categorias/nuevo" element={<FormSubCategorie />} />
          <Route path="/administrar/sub-categorias/:id" element={<FormSubCategorie />} />
          <Route path="/administrar/servicios/" element={<Services />} />
          <Route path="/administrar/servicios/nuevo" element={<FormService />} />
          <Route path="/administrar/servicios/:id" element={<FormService />} />
          <Route path="/administrar/productos/" element={<Products />} />
          <Route path="/administrar/productos/nuevo" element={<FormProduct />} />
          <Route path="/administrar/productos/:id" element={<FormProduct />} />
          <Route path="/administrar/promociones/" element={<Promociones />} />
          <Route path="/administrar/promociones/nuevo" element={<FormPromocion />} />
          <Route path="/administrar/promociones/:id" element={<FormPromocion />} />
          <Route path="/administrar/etiquetas/" element={<Etiquetas />} />
          <Route path="/administrar/etiquetas/nuevo" element={<FormEtiqueta />} />
          <Route path="/administrar/etiquetas/:id" element={<FormEtiqueta />} />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
