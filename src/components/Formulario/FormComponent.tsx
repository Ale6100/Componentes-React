import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AtSign, CircleX, Loader2, LoaderCircle, PenLine } from "lucide-react";
import { waitFor } from "@/utils";

const formSchema = z.object({
  username: z.string()
    .min(3, { message: "El nombre de usuario debe contener al menos 3 carácteres"})
    .max(20, { message: "El nombre de usuario no puede contener más de 20 carácteres"})
    .regex(/^[a-zA-Z0-9]+$/, { message: "El nombre de usuario solo puede contener letras y números"}),
  mail: z.string()
    .email({ message: "El correo electrónico no es válido"}),
  country: z.string()
    .min(1, { message: "La nacionalidad es requerida"}),
  work: z.string()
    .min(1, { message: "La ocupación actual es requerida"}),
});

type FormSchema = z.infer<typeof formSchema>;

export default function FormComponent() {
  const [ btnLoading, setBtnLoading ] = useState(false);

  const [ inputWorkIsLoading, setInputWorkIsLoading ] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      mail: "",
      country: "",
      work: "",
    }
  });

  const country = useWatch({
    control: form.control,
    name: "country",
  });

  const work = useWatch({
    control: form.control,
    name: "work",
  });

  useEffect(() => {
    setInputWorkIsLoading(true);

    const timer = setTimeout(() => {
      setInputWorkIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [work]);

  const handleSubmit = async (values: FormSchema) => {
    console.log('Datos enviados:', values);

    setBtnLoading(true);
    const segundosRandom = Math.floor(Math.random() * 4) + 2;
    await waitFor(segundosRandom * 1000);
    toast.success("Formulario enviado");
    setBtnLoading(false);
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
              <FormDescription>
                Input básico
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel onClick={() => form.setFocus('mail')}>Correo electrónico</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input className="peer ps-9" placeholder="pablo@gmail.com" type="email" {...field} />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Input con un ícono a la izquierda
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel onClick={() => form.setFocus('country')}>Nacionalidad</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input className="pe-9" placeholder="Argentina" type="text" {...field}/>
                  {
                  country !== '' && (
                    <Button aria-label="Borrar input" onClick={() => form.setValue('country', '')} className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow animate-in fade-in zoom-in-75 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
                      <CircleX size={16} strokeWidth={2} aria-hidden="true" color="white" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Input con un un botón para limpiar el campo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="work"
          render={({ field }) => (
            <FormItem>
              <FormLabel onClick={() => form.setFocus('work')}>Ocupación actual</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    {
                      inputWorkIsLoading ?
                        <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" role="presentation" />
                        :
                        <PenLine size={16} strokeWidth={2} aria-hidden="true" />
                    }
                  </div>

                  <Input className="peer ps-9" placeholder="Programador" type="text" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                Input con un ícono a la izquierda que tiene un loader mientras escribís
              </FormDescription>
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
      </form>
    </Form>
  );
}
