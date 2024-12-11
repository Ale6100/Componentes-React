import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import ProgressForm from "./ProgressForm";

export default function Progressindex() {
  const [ formActual, setFormActual ] = useState(1)

  const formList = [
    { id: 1, label: 'Formulario 1', completado: false },
    { id: 2, label: 'Formulario 2', completado: true },
    { id: 3, label: 'Formulario 3', completado: false },
    { id: 4, label: 'Formulario 4', completado: true },
  ]

  return (
    <section className="max-w-5xl w-full mx-auto my-4  flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Progreso entre formularios</h1>

      <p className="text-center">Componente que te dice en cuál formulario estás</p>

      <ProgressForm formList={formList} formActual={formActual} />

      <div className="w-full flex justify-center gap-4">
        <Button onClick={() => setFormActual(formActual - 1)} disabled={formActual === 1}>Anterior</Button>
        <Button onClick={() => setFormActual(formActual + 1)} disabled={formActual === formList.length}>Siguiente</Button>
      </div>

      <p className="px-1">Para el ejemplo estamos dando por hecho que sólo los formularios 2 y 4 están completos, y le damos permiso al usuario de navegar entre ellos</p>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-sm text-white text-wrap max-md:text-xs">
          {
            `<ProgressForm formList={formList} formActual={formActual} />`
          }
        </pre>

        <p>Donde formList es la lista que contiene información básica de los formularios, y formActual indica en cuál estás posicionado</p>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/ProgressForm/ProgressForm.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
      </div>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary">
        <h2 className="text-2xl font-semibold mb-4">Características:</h2>

        <ul className="space-y-4">
          {[
            "Extensible a cualquier cantidad de formularios",
            "Te indica en cuál formulario estás",
            "Te indica cuáles formularios tenés pendientes",
            "Te indica cuáles formularios ya completaste",
          ].map(item => (
            <li key={item} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
