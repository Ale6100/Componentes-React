import { ArrowBigLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface NotFoundProps {
  readonly className?: string
  readonly redirect?: string
}

/**
 * Componente para mostrar una página de error 404 (Página no encontrada).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clase CSS adicional para personalizar el contenedor principal.
 * @property {string} [redirect] - Si se proporciona, se renderiza un botón que redirige al valor del redirect.
 *
 * @returns {JSX.Element} Un componente visual que representa la página de error 404 con un diseño centrado.
 */
export default function NotFound({ className, redirect }: NotFoundProps): JSX.Element {
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-r animate-gradient-x ${className ?? ''}`}>
      <div className="text-center">
        <h1 className="text-9xl max-md:text-7xl font-extrabold text-black tracking-widest">
          <span className="inline-block animate-bounce">4</span>
          <span className="inline-block animate-bounce delay-100">0</span>
          <span className="inline-block animate-bounce delay-200">4</span>
        </h1>
        <div className={`mt-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-2xl font-semibold mb-8">
            Página no encontrada
          </p>
          {redirect && (
          <div className="flex justify-center mt-6">
            <Link to={redirect}>
              <Button variant="outline" size="lg" className="font-semibold text-blue-500 border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform">
                <ArrowBigLeft className="mr-2 h-5 w-5" />
                Volver
              </Button>
            </Link>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
