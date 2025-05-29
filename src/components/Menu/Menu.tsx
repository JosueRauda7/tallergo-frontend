import { useEffect, useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if(window.innerWidth < 768) {
      setIsMobile(true);
      setShowMenu(false);
    }
  }, []);

  return (
    <div>
      <div className="menu flex md:flex-col lg:flex-row items-center bg-cyan-950 text-white p-4 shadow-lg">
        <div className="logo flex items-center">
          <span className="text-xl font-bold">TallerGo</span>
        </div>
        <nav className="ml-auto cursor-pointer">
          <div onClick={() => setShowMenu(!showMenu)} className="lg:hidden md:flex flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          {!isMobile && showMenu && (
            <ul className="lg:flex lg:flex-row md:flex-row sm:flex-col space-x-4">
                <>
                  <Link to="/" className="nav-option-desktop text-gray-100 hover:text-shadow-2xs hover:text-white cursor-pointer">Inicio</Link>
                  <Link to="/talleres" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Talleres</Link>
                  <Link to="/about-us" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Acerca de</Link>
                  <Link to="/contact-us" className="nav-option-desktop text-gray-50 hover:text-white cursor-pointer">Contáctanos</Link>
                </>
            </ul>
          )}
        </nav>
      </div>
      {isMobile && showMenu && (
        <ul className="lg:flex lg:flex-row md:flex-row sm:flex-col space-x-4 bg-cyan-950 shadow-lg">
            <>
              <li className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Inicio</li>
              <li className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Talleres</li>
              <li className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Acerca de</li>
              <li className="text-gray-100 p-4 hover:text-white hover:bg-cyan-700 active:text-white active:bg-cyan-800 cursor-pointer">Contáctanos</li>
            </>
        </ul>
      )}
    </div>
  );
}

export default Menu;