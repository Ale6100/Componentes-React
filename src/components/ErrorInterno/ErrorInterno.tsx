import { AlertTriangle, ArrowBigLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

/**
 * Props para el componente ErrorInterno.
 * @typedef {Object} ErrorInternoProps
 * @property {string} [mensaje="Ha ocurrido un error inesperado."] - Mensaje que se muestra al usuario.
 * @property {string} [className=""] - Clases CSS adicionales para personalizar el contenedor principal.
 * @property {string} [redirect] - Si se proporciona, se renderiza un botón que redirige al valor del redirect.
 */
interface ErrorInternoProps {
  readonly mensaje?: string
  readonly className?: string
  readonly redirect?: string
}

/**
 * Componente que muestra un mensaje de error interno.
 *
 * @param {ErrorInternoProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente de error interno renderizado.
 */
export default function ErrorInterno({ mensaje = "Ha ocurrido un error inesperado.", className="", redirect }: ErrorInternoProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className={`bg-white p-8 max-sm:p-4 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-500 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping"></div>
            <AlertTriangle className="h-16 w-16 text-red-500 relative z-10 animate-bounce" />
          </div>
        </div>
        <h1 className="text-3xl max-sm:text-xl font-bold text-center text-gray-800 mb-4">
          ¡Ups! Algo salió mal
        </h1>
        <p className="text-center text-gray-600 mb-6 animate-pulse">
          {mensaje}
        </p>
        <div className="border-t border-gray-200 pt-6 mt-6">
          <p className="text-sm text-gray-500 text-center mb-4">
            Nuestro equipo ha sido notificado y estamos trabajando en una solución.
          </p>
        </div>
        {redirect && (
          <div className="flex justify-center mt-6">
            <Link to={redirect}>
              <Button variant="outline" size="lg" className="font-semibold text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform">
                <ArrowBigLeft className="mr-2 h-5 w-5" />
                Volver
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
