import { Button } from "@/components/ui/button";
import { z } from "zod";
import { createFixture } from 'zod-fixture';

interface BtnAutocompletarProps<T extends z.ZodObject<z.ZodRawShape>> {
  readonly className?: string;
  readonly schema: T; // Tipo de esquema de Zod
  readonly onAutofill: (data: z.infer<T>) => void; // Función que manejará los datos falsos
}

export default function BtnAutocompletar<T extends z.ZodObject<z.ZodRawShape>>({ className, schema, onAutofill }: BtnAutocompletarProps<T>) {
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
