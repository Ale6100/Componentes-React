import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { waitFor } from "@/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string()
    .min(3, { message: "El nombre de usuario debe contener al menos 3 carácteres"})
    .max(20, { message: "El nombre de usuario no puede contener más de 20 carácteres"})
    .regex(/^[a-zA-Z0-9]+$/, { message: "El nombre de usuario solo puede contener letras y números"}),
});

type FormSchema = z.infer<typeof formSchema>;

export default function BtnPending() {
  const [ btnLoading, setBtnLoading ] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    }
  });

  const handleSubmit = async (/* values: FormSchema */) => {
    setBtnLoading(true);
    const toastId = toast.loading('Enviando...');;

    const segundosRandom = Math.floor(Math.random() * 4) + 2;
    await waitFor(segundosRandom * 1000);

    setBtnLoading(false);

    if (Math.random() < 0.5) {
      toast.error('Error al enviar el formulario', {
        id: toastId,
      });
      return;
    }

    toast.success('Formulario enviado', {
      id: toastId,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-10 flex flex-col gap-6 border rounded">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          {
              btnLoading
                ? <Button className="w-48" type="button" disabled>
                    <Loader2 className="animate-spin mr-1" />
                    Guardando
                  </Button>
                : <Button className="w-48" type="submit">Guardar</Button>
            }
          <Button type="reset" className="w-48" onClick={() => form.reset()}>Resetear</Button>
        </div>
        <FormDescription>
          En esta simulación los datos se envían exitosamente en el 50% de los casos, mientras que en la otra mitad ocurre un error, permitiendo observar ambos resultados posibles.
        </FormDescription>
      </form>
    </Form>
  );
}