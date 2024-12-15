import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavBar() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="bg-gray-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Componentes</span>
          <button title="Abrir menú" onClick={toggleMenu} className="lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>
        </div>
        <ul className={`mt-2 flex flex-col lg:flex-row gap-6 justify-around transition-all duration-300 ease-in-out overflow-hidden lg:overflow-visible ${isMenuOpen ? "max-h-screen" : "max-h-0"} lg:max-h-none lg:visible`}>
          <li>
            <NavLink to="/" className="hover:underline"> Inicio </NavLink>
          </li>
          <li>
            <NavLink to="/tabla" className="hover:underline"> Tabla </NavLink>
          </li>
          <li>
            <NavLink to="/btnAutocompletar" className="hover:underline"> Botón de autocompletado </NavLink>
          </li>
          <li>
            <NavLink to="/btnLoading" className="hover:underline"> Botón loading </NavLink>
          </li>
          <li>
            <NavLink to="/progress" className="hover:underline"> Progreso entre formularios </NavLink>
          </li>
          <li>
            <NavLink to="/alert" className="hover:underline"> Alert </NavLink>
          </li>
          <li>
            <NavLink to="/progressCircle" className="hover:underline"> Progreso circular </NavLink>
          </li>
          <li>
            <NavLink to="/error404" className="hover:underline"> Error 404 </NavLink>
          </li>
          <li>
            <NavLink to="/formulario" className="hover:underline"> Formulario </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
