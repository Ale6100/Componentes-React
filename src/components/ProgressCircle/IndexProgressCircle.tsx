import { useEffect, useState } from "react";
import ProgressCircle from "./ProgressCircle";
import { Separator } from "@radix-ui/react-separator";
import { CheckCircle } from "lucide-react";

const IndexProgressCircle = () => {
  const [ percentage, setPercentage ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(parseFloat((Math.random() * 100).toFixed(2)) );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-5xl w-full mx-auto my-4 flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Progreso circular</h1>

      <p className="text-center">Componente que renderiza una barra de progreso circular</p>

      <div className="flex justify-center">
        <ProgressCircle percentage={percentage} className="w-40" classNameNumber="text-xl"/>
      </div>

      <p className="px-1">Para el ejemplo decidí hacer que el porcentaje cambie cada un segundo para apreciar sus distintos estados</p>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-sm text-white text-wrap max-md:text-xs">
          {
            `<ProgressCircle percentage={percentage}/>`
          }
        </pre>

        <p>Donde percentage es el porcentaje deseado a renderizar</p>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/ProgressCircle/ProgressCircle.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
      </div>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary">
        <h2 className="text-2xl font-semibold mb-4">Características:</h2>

        <ul className="space-y-4">
          {[
            "Color dinámico según el porcentaje, desde amarillo hasta verde",
            "Animación de carga al cambiar el porcentaje",
            "Clase del contenedor y del texto para estilizar a gusto",
          ].map(item => (
            <li key={item} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IndexProgressCircle;
