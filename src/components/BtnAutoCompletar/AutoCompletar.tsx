import { CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import FormularioEjemplo from "./FormularioEjemplo";
import InfoLinks from "../InfoLinks";
import type { InfoLink } from "@/type";

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
    <section className="max-w-5xl w-full mx-auto my-4 flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Botón de autocompletado</h1>

      <p className="text-center">Un botón que completa un formulario con campos válidos y al azar</p>

      <FormularioEjemplo />

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-sm text-white text-wrap max-md:text-xs">
          {
            `<BtnAutocompletar schema={formSchema} onAutofill={handleAutofill} />`
          }
        </pre>

        <p>Donde formSchema es el schema de zod, y handleAutoFill es una función cuyo argumento tendrá los datos random generados</p>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/BtnAutoCompletar/BtnAutocompletar.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
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
