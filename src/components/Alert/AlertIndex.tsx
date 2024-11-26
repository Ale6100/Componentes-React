import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import AlertAction from "./AlertAction";
import InfoLinks from "../InfoLinks";
import type { InfoLink } from "@/type";

const infoLinks: InfoLink[] = [
  {
    name: "alert-dialog",
    description: "de Shadcn",
    url: "https://ui.shadcn.com/docs/components/alert-dialog",
  }
]

const AlertIndex = () => {
  const [ isAlertOpen, setIsAlertOpen ] = useState(false);

  const onAccept = () => {
    toast.success("[Se ejecuta la acción]");
  }

  return (
    <section className="max-w-5xl w-full mx-auto my-4 flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Alert</h1>

      <p className="text-center">Un alert con botones de acción</p>

      <div className="mx-auto">
        <Button className="w-fit" onClick={() => setIsAlertOpen(true)}>Abrir alerta</Button>
      </div>

      <AlertAction isOpen={isAlertOpen} onOpenChange={setIsAlertOpen} onAccept={onAccept} title="Título ejemplo" description="Descripción ejemplo" />

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-xs text-white text-wrap max-md:text-xs">
          {
            `<AlertAction isOpen={isAlertOpen} onOpenChange={setIsAlertOpen} onAccept={onAccept} title="Título ejemplo" description="Descripción ejemplo" />`
          }
        </pre>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/Alert/AlertAction.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
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
            "Se exige una función onAccept que se ejecuta al hacer clic en el botón de aceptar",
            "Se puede personalizar el texto de los botones de aceptar y cancelar",
            "Se puede personalizar el título y la descripción de la alerta",
            "Opcionalmente se puede definir una acción que se ejecuta al hacer clic en el botón de cancelar",
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

export default AlertIndex;
