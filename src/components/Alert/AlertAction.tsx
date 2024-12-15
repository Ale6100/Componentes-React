import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface AlertActionProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly onAccept: () => void;
  readonly title: string;
  readonly description: string;
  readonly onCancel?: () => void;
  readonly accept?: string;
  readonly cancel?: string;
  readonly btnsDisabled?: boolean;
}

/**
 * Un componente Alert
 * Ofrece opciones para aceptar y continuar o cancelar.
 *
 * @component
 *
 * @param {AlertActionProps} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Indica si la alerta está abierta o cerrada.
 * @param {(isOpen: boolean) => void} props.onOpenChange - Callback que se invoca cuando se cambia el estado de apertura de la alerta.
 * @param {() => void} props.onAccept - Callback que se invoca cuando el usuario hace clic en "Aceptar".
 * @param {string} props.title - El título de la alerta.
 * @param {string} props.description - La descripción de la alerta.
 * @param {() => void} [props.onCancel=() => {}] - Callback que se invoca cuando el usuario hace clic en "Cancelar".
 * @param {string} [props.accept='Aceptar'] - El texto del botón de aceptar.
 * @param {string} [props.cancel='Cancelar'] - El texto del botón de cancelar.
 * @param {boolean} [props.btnsDisabled=false] - Estado que deshabilitará los botones cuando sea true.
 *
 * @returns {JSX.Element} El componente de alerta renderizado.
 */
export default function AlertAction({ isOpen, onOpenChange, onAccept, title, description, onCancel = () => {}, accept = 'Aceptar', cancel = 'Cancelar', btnsDisabled = false }: AlertActionProps): JSX.Element {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-black">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction disabled={btnsDisabled} onClick={onAccept}>
            {accept}
          </AlertDialogAction>
          <AlertDialogCancel disabled={btnsDisabled} onClick={onCancel}>
            {cancel}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
