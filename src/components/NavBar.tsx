import { NavLink  } from "react-router-dom";

export default function NavBar () {
  return (
    <header>
      <nav className="bg-gray-800 p-4 text-white text-lg">
        <ul className="flex flex-wrap gap-4 justify-around">
          <li>
            <NavLink to="/" className="hover:underline">Inicio</NavLink >
          </li>
          <li>
            <NavLink to="/tabla" className="hover:underline">Tabla</NavLink >
          </li>
          <li>
            <NavLink to="/formulario" className="hover:underline">Formulario</NavLink >
          </li>
          <li>
            <NavLink to="/btnAutocompletar" className="hover:underline">Botón de autocompletado</NavLink >
          </li>
          <li>
            <NavLink to="/btnPending" className="hover:underline">Botón pendiente</NavLink >
          </li>
          <li>
            <NavLink to="/error404" className="hover:underline">404</NavLink >
          </li>
        </ul>
      </nav>
    </header>
  )
}