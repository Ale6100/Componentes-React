import { CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Form from "./FormComponent";
import InfoLinks from "../InfoLinks";
import type { InfoLink } from "@/type";

const infoLinks: InfoLink[] = [
  {
    name: "Form",
    description: "de Shadcn",
    url: "https://ui.shadcn.com/docs/components/form",
  },
  {
    name: "useForm",
    description: "de React Hook Form",
    url: "https://react-hook-form.com/",
  },
  {
    name: 'zod',
    description: 'de Zod',
    url: 'https://zod.dev'
  },
  {
    name: 'originui',
    description: 'de origin-space',
    url: 'https://originui.com/'
  }
]


export default function Formulario() {
  return (
    <section className="max-w-5xl w-full mx-auto my-4 flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Formulario</h1>

      <p className="text-center">Un formulario con distintos tipos de inputs y validaciones</p>

      <Form />

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>A diferencia de los demás componentes del sitio, este no se invoca en una línea. En su lugar se debe analizar su estructura entera y tomar lo que te interese</p>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/Formulario/FormComponent.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
      </div>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary">
        <h2 className="text-2xl font-semibold mb-4">Links de utilidad:</h2>

        <ul className="space-y-3">
          {infoLinks.map(tool => (
            <InfoLinks key={tool.url} tool={tool} />
          ))}
        </ul>
      </div>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary">
        <h2 className="text-2xl font-semibold mb-4">Características:</h2>

        <ul className="space-y-4">
          {[
            "El formulario se renderiza bien estructurado y con etiquetas semánticas adecuadas",
            "Aplica los atributos aria correctos a los campos de formulario en función de los estados",
            "Es posible validar los campos que uno desee y manejarlos con un error personalizado con z.object",
            "En los ejemplos se aprecia la capacidad de agregar labels y descripciones, también botones e íconos con eventos",
            "Cuenta con un botón que se deshabilita y tiene un spinner mientras se envía el formulario",
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
}