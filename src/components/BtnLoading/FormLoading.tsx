import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { waitFor } from "@/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BtnLoading, { TypeBtnLoading } from "./BtnLoading";
import InfoLinks from "../InfoLinks";
import type { InfoLink } from "@/type";

const infoLinks: InfoLink[] = [
  {
    name: "Sonner",
    description: "de shadcn",
    url: "https://ui.shadcn.com/docs/components/sonner"
  },
  {
    name: "Sonner",
    description: "de sonner",
    url: "https://sonner.emilkowal.ski/getting-started"
  },
]

const formSchema = z.object({
  username: z.string()
    .min(3, { message: "El nombre de usuario debe contener al menos 3 carácteres"})
    .max(20, { message: "El nombre de usuario no puede contener más de 20 carácteres"})
    .regex(/^[a-zA-Z0-9]+$/, { message: "El nombre de usuario solo puede contener letras y números"}),
});

type FormSchema = z.infer<typeof formSchema>;

export default function FormLoading() {
  const [ btnLoading, setBtnLoading ] = useState<TypeBtnLoading>({ state: null, message: '' });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    }
  });

  const handleSubmit = async (/* values: FormSchema */) => {
    setBtnLoading({ state: 'loading', message: 'Enviando...' });

    const segundosRandom = Math.floor(Math.random() * 4) + 2;
    await waitFor(segundosRandom * 1000);

    if (Math.random() < 0.5) {
      setBtnLoading({ state: 'error', message: 'Error al enviar el formulario' });
      return;
    }

    setBtnLoading({ state: 'success', message: 'Formulario enviado' });
    form.reset();
  }

  return (
    <section className="max-w-5xl w-full mx-auto my-4  flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Botón loading y Toast loading</h1>

      <p className="text-center">Componente de botón con indicador de carga y notificación de estado</p>

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
            <BtnLoading btnLoading={btnLoading} className="w-48" />
            <Button type="reset" className="w-48" onClick={() => form.reset()}>Resetear</Button>
          </div>
          <FormDescription>
            En esta simulación los datos se envían exitosamente en el 50% de los casos, mientras que en la otra mitad ocurre un error, permitiendo observar ambos resultados posibles.
          </FormDescription>
        </form>
      </Form>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-sm text-white text-wrap max-md:text-xs">
          {
            `<BtnLoading btnLoading={btnLoading} />`
          }
        </pre>

        <p>Donde btnLoading es un estado que le indica al botón qué comportamiento debe tener</p>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/BtnLoading/BtnLoading.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
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
            "El botón para enviar el forulario se deshabilita mientras se envía",
            "Muestra un toast (un mensaje) que indica que se están enviando los datos",
            "El mismo toast cambia de color y mensaje al finalizar el envío. El cambio le dirá al usuario si el envío fue exitoso o no",
            "Es posible personalizar los textos del botón y de su estado deshabilitado",
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
