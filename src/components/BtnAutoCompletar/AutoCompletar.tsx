import type { InfoLink } from "@/type";
import InfoLinks from "../InfoLinks";
import { Separator } from "../ui/separator";
import FormularioEjemplo from "./FormularioEjemplo";
import { CheckCircle } from "lucide-react";

const infoLinks: InfoLink[] = [
  {
    name: "zod-fixture",
    description: "de timdeschryver",
    url: "https://github.com/timdeschryver/zod-fixture"
  },
  {
    name: 'zod',
    description: 'de Zod',
    url: 'https://zod.dev'
  },
]

export default function AutoCompletar() {
  return (
    <section className="my-4 w-full mx-auto flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Botón de autocompletado</h1>

      <p className="text-center">Un botón que completa un formulario con campos válidos y al azar</p>

      <div className="max-w-5xl w-full mx-auto">
        <FormularioEjemplo />
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
            "El botón autocompleta cualquier campo con datos al azar, asegurándose de que pasen las validaciones que uno configure",
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
