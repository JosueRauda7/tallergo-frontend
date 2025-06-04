import { useContext, useEffect, useState } from "react";
import "./Menu.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const Menu = () => {
  const navigate = useNavigate();
  const { userType, user, logout } = useContext(LoginContext);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if(window.innerWidth < 768) {
      setIsMobile(true);
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowMenu(!mobile); // Mostrar menú por defecto en desktop, ocultarlo en mobile
    };

    handleResize(); // Llamar una vez al montar para establecer el valor inicial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div className="menu flex sm:flex-col md:flex-row lg:flex-row items-center bg-cyan-950 text-white p-4 shadow-lg">
        <div onClick={() => navigate('/')} className="logo flex items-center cursor-pointer">
          <span className="text-xl font-bold">TallerGo</span>
        </div>
        <nav className="ml-auto cursor-pointer">
          <div onClick={() => setShowMenu(!showMenu)} className="md:hidden sm:flex flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          {!isMobile && showMenu && (
            <ul className="lg:flex lg:flex-row md:flex md:flex-row space-x-4">
                <>
                  <Link to="/" className="nav-option-desktop text-gray-100 hover:text-shadow-2xs hover:text-white cursor-pointer">Inicio</Link>
                  <Link to="/talleres" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Talleres</Link>
                  <Link to="/administrar" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Administrar</Link>
                  <Link to="/acerca-de" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Acerca de</Link>
                  <Link to="/contactanos" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Contáctanos</Link>
                  <p onClick={() => {
                    logout();
                    navigate('/');
                  }} className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Cerrar Sesión</p>
                </>
            </ul>
          )}
        </nav>
      </div>
      {isMobile && showMenu && (
        <ul className="flex flex-col space-x-4 bg-cyan-950 shadow-lg">
            <>
              <Link to="/" onClick={() => setShowMenu(!showMenu)} className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Inicio</Link>
              <Link to="/talleres" onClick={() => setShowMenu(!showMenu)} className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Talleres</Link>
              <Link to="/administrar" onClick={() => setShowMenu(!showMenu)} className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Administrar</Link>
              <Link to="/acerca-de" onClick={() => setShowMenu(!showMenu)} className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Acerca de</Link>
              <Link to="/contactanos" onClick={() => setShowMenu(!showMenu)} className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Contáctanos</Link>
              <p onClick={() => {
                logout();
                navigate('/');
              }} className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Cerrar Sesión</p>
            </>
        </ul>
      )}
    </div>
  );
}

export default Menu;