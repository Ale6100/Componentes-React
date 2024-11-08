'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import { Link } from 'react-router-dom'

export default function NotFound() {
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r animate-gradient-x">
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
          <Link to="/">
            <Button variant="secondary" size="lg" className="font-semibold border border-black hover:bg-slate-300">
              <ArrowBigLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
