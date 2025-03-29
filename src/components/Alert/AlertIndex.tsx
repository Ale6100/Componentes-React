import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import AlertAction, { BtnAlertActionConfig } from "./AlertAction";
import InfoLinks from "../InfoLinks";
import type { InfoLink } from "@/type";
import { waitFor } from "@/utils";

const infoLinks: InfoLink[] = [
  {
    name: "alert-dialog",
    description: "de Shadcn",
    url: "https://ui.shadcn.com/docs/components/alert-dialog",
  }
]

const AlertIndex = () => {
  const [ isAlertWarningOpen, setIsAlertWarningOpen ] = useState(false);
  const [ isAlertOpen, setIsAlertOpen ] = useState(false);
  const [ toastId, setToastId ] = useState<string | number | undefined>(1);

  const configBtnAccept: BtnAlertActionConfig = {
    onClick: async () => {
      setToastId(toast.loading("Ejecutando acción afirmativa...", { id: toastId }));
      await waitFor(3000);
      toast.success("Acción afirmativa ejecutada", { id: toastId });
    },
  }

  const configBtnCancel: BtnAlertActionConfig = {
    text: "Declinar",
    onClick: async () => {
      setToastId(toast.loading("Ejecutando acción negativa...", { id: toastId }));
      await waitFor(3000);
      toast.error("Acción negativa ejecutada", { id: toastId });
    },
  }

  return (
    <section className="max-w-5xl w-full mx-auto my-4 flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Alert</h1>

      <p className="text-center">Un alert con botones de acción. Ofrece opciones personalizables para aceptar y continuar o cancelar.</p>

      <div className="mx-auto flex gap-4 items-center justify-center">
        <Button className="w-fit" onClick={() => setIsAlertOpen(true)}>Alerta base</Button>
        <Button className="w-fit" onClick={() => setIsAlertWarningOpen(true)}>Alerta warning con ambos botones de acción asíncronos</Button>
      </div>

      <AlertAction isOpen={isAlertOpen} onOpenChange={setIsAlertOpen} title="Título ejemplo" description="Descripción ejemplo" />
      <AlertAction type="warning" isOpen={isAlertWarningOpen} onOpenChange={setIsAlertWarningOpen} title="Título ejemplo" description="Descripción ejemplo" configBtnAccept={configBtnAccept} configBtnCancel={configBtnCancel} />

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-xs text-white text-wrap max-md:text-xs">
          {
            ` <AlertAction isOpen={isOpen} onOpenChange={onOpenChange} title="Título ejemplo" description="Descripción ejemplo" />`
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
            "Se puede personalizar el título y la descripción de la alerta",
            "Se puede personalizar el texto y los estilos de los botones acción",
            "Se puede personalizar la función que se ejecuta al hacer clic en cada botón",
            "Los botones de acción se deshabilitan automáticamente mientras alguna de las funciones se está ejecutando",
            "Hay seis tipos de alertas: warning, error, info, success, question y none",
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
