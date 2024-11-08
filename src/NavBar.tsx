import { NavLink  } from "react-router-dom";

export default function NavBar () {
  return (
    <header>
      <nav className="bg-gray-800 p-4 text-white text-lg">
        <ul className="flex gap-4 justify-around">
          <li>
            <NavLink to="/" className="hover:underline">Inicio</NavLink >
          </li>
          <li>
            <NavLink to="/tabla" className="hover:underline">Tabla</NavLink >
          </li>
        </ul>
      </nav>
    </header>
  )
}