import type { InfoLink } from "@/type";
import InfoLinks from "../InfoLinks";
import { Separator } from "../ui/separator";
import { CheckCircle } from "lucide-react";
import BtnPending from "./BtnPending";

const infoLinks: InfoLink[] = [
  {
    name: "Sonner",
    description: "de shadcn",
    url: "https://ui.shadcn.com/docs/components/sonner"
  },
  {
    name: "Sonner",
    description: "de sonner",
    url: "https://sonner.emilkowal.ski/"
  },
]

export default function Pending() {
  return (
    <section className="max-w-5xl w-full mx-auto my-4  flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Botón Pendiente y Toast Pendiente</h1>

      <p className="text-center">Un botón y notificación para que el usuario sepa esperar a que el formulario termine de enviarse</p>

      <BtnPending />

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
            "El botón para enviar el forulario se deshabilita mientras se envía",
            "Muestra un toast (un mensaje) que indica que se están enviando los datos",
            "El mismo toast cambia de color y mensaje al finalizar el envío. El cambio le dirá al usuario si el envío fue exitoso o no",
            "Se vacían los campos en caso de que el envío haya sido exitoso",
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
