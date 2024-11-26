import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export type TypeBtnLoading = {
  state: null | 'loading' | 'success' | 'error';
  message: string;
}

type BtnLoadingProps = {
  readonly className?: string;
  readonly btnLoading: TypeBtnLoading;
  readonly txtOriginal?: string;
  readonly txtCargando?: string;
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
 * @param {string} [props.txtOriginal='Guardar'] - Texto original del botón.
 * @param {string} [props.txtCargando='Guardando'] - Texto que se muestra cuando el botón está cargando.
 */
export default function BtnLoading({ className, btnLoading, txtOriginal = 'Guardar', txtCargando = 'Guardando' }: BtnLoadingProps) {
  const [ toastId, setToastId ] = useState<string | number | undefined>(crypto.getRandomValues(new Uint32Array(1))[0]);

  useEffect(() => {
    if (btnLoading.state === 'loading') {
      setToastId(toast.loading(btnLoading.message, { id: toastId }));
      return;
    }

    if (btnLoading.state === 'success') {
      toast.success(btnLoading.message, {
        id: toastId,
      });
      return;
    }

    if (btnLoading.state === 'error') {
      toast.error(btnLoading.message, {
        id: toastId,
      });
      return;
    }

    if (btnLoading.state === null) {
      toast.dismiss(toastId);
    }

    return () => {
      toast.dismiss(toastId);
    };

  }, [btnLoading.state, btnLoading.message]);

  return (
    <>
      {
        btnLoading.state === 'loading'
          ? <Button className={className} type="button" disabled>
              <Loader2 className="animate-spin mr-1" />
              {txtCargando}
            </Button>
          : <Button className={className} type="submit">{txtOriginal}</Button>
      }
    </>
  );
}
