import { useState } from "react";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="menu flex md:flex-col sm:flex-col lg:flex-row items-center bg-cyan-950 text-white p-4 shadow-lg">
      <div className="logo flex items-center">
        <span className="text-xl font-bold">TallerGo</span>
      </div>
      <nav className="ml-auto cursor-pointer">
        <div className="md:hidden lg:hidden sm:flex flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <ul className="flex lg:flex-row md:flex-col sm:flex-col space-x-4">
          <li><a href="#home" className="text-white-700 hover:text-white-900">Inicio</a></li>
          <li><a href="#talleres" className="text-white-700 hover:text-white-900">Talleres</a></li>
          <li><a href="#about" className="text-white-700 hover:text-white-900">Acerca de</a></li>
          <li><a href="#contact" className="text-white-700 hover:text-white-900">Contacto</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;