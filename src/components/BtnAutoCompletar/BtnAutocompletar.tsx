import { Button } from "@/components/ui/button";
import { createFixture } from 'zod-fixture';
import { z } from "zod";

interface BtnAutocompletarProps<T extends z.ZodObject<z.ZodRawShape>> {
  readonly className?: string;
  readonly schema: T;
  readonly onAutofill: (data: z.infer<T>) => void;
}

/**
 * BtnAutocompletar - Componente de botón que genera y devuelve datos al azar basados en un esquema de Zod.
 *
 * @template T - Tipo genérico que representa un objeto de Zod.
 *
 * @param {BtnAutocompletarProps<T>} props - Propiedades para configurar el componente.
 * @param {string} [props.className] - Clase CSS opcional para aplicar estilos adicionales al botón.
 * @param {T} props.schema - Esquema de Zod que define la estructura de datos a generar.
 * @param {(data: z.infer<T>) => void} props.onAutofill - Función que se invoca con los datos falsos generados como argumento.
 *
 * @returns {JSX.Element} - Un botón que al hacer clic genera datos al azar según el esquema dado.
 */
export default function BtnAutocompletar<T extends z.ZodObject<z.ZodRawShape>>({ className, schema, onAutofill }: BtnAutocompletarProps<T>): JSX.Element {

  /**
   * handleAutofill - Función interna que genera los datos falsos y los envía a la función onAutofill.
   */
  const handleAutofill = () => {
    const data = createFixture(schema);
    onAutofill(data);
  };

  return (
    <Button variant="outline" className={className} onClick={handleAutofill}>
      Autocompletar
    </Button>
  );
}
