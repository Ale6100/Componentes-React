import { NavLink  } from "react-router-dom";

export default function NavBar () {
  return (
    <header>
      <nav className="bg-gray-800 p-4 text-white text-base">
        <ul className="flex flex-wrap gap-6 justify-around">
          <li>
            <NavLink to="/" className="hover:underline">Inicio</NavLink >
          </li>
          <li>
            <NavLink to="/tabla" className="hover:underline">Tabla</NavLink >
          </li>
          <li>
            <NavLink to="/btnAutocompletar" className="hover:underline">Botón de autocompletado</NavLink >
          </li>
          <li>
            <NavLink to="/btnLoading" className="hover:underline">Botón loading</NavLink >
          </li>
          <li>
            <NavLink to="/progress" className="hover:underline">Progreso entre formularios</NavLink >
          </li>
          <li>
            <NavLink to="/alert" className="hover:underline">Alert</NavLink >
          </li>
          <li>
            <NavLink to="/progressCircle" className="hover:underline">Progreso circular</NavLink >
          </li>
          <li>
            <NavLink to="/error404" className="hover:underline">Error 404</NavLink >
          </li>
          <li>
            <NavLink to="/formulario" className="hover:underline">Formulario</NavLink >
          </li>
        </ul>
      </nav>
    </header>
  )
}