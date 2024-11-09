import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type TypeBtnLoading = {
  state: null | 'loading' | 'success' | 'error';
  message: string;
}

type BtnLoadingProps = {
  readonly className?: string;
  readonly btnLoading: TypeBtnLoading;
};

/**
 * BtnLoading - Componente de botón con indicador de carga y notificación de estado.
 *
 * Este componente muestra un botón disabled con un spinner cuando el estado es `loading`.
 * Además, utiliza notificaciones `toast` para informar al usuario sobre el progreso de la operación.
 *
 * @component
 * @param {BtnLoadingProps} props - Propiedades del componente.
 * @param {string} [props.className] - Clase CSS opcional para personalizar el estilo del botón.
 * @param {TypeBtnLoading} props.btnLoading - Objeto que contiene el estado y el mensaje del botón.
 */
export default function BtnLoading({ className, btnLoading }: BtnLoadingProps) {
  const [ toastId, setToastId ] = useState<string | number | undefined>();

  useEffect(() => {
    if (btnLoading.state === 'loading') {
      setToastId(toast.loading(btnLoading.message));
      return;
    }

    if (btnLoading.state === 'success') {
      toast.success('Formulario enviado', {
        id: toastId,
      });
      return;
    }

    if (btnLoading.state === 'error') {
      toast.error('Error al enviar el formulario', {
        id: toastId,
      });
      return;
    }

    if (btnLoading.state === null) {
      toast.dismiss(toastId);
    }

  }, [btnLoading]);

  return (
    <>
      {
        btnLoading.state === 'loading'
          ? <Button className={className} type="button" disabled>
              <Loader2 className="animate-spin mr-1" />
              Guardando
            </Button>
          : <Button className={className} type="submit">Guardar</Button>
      }
    </>
  );
}
