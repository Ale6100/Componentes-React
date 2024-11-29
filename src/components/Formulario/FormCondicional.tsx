import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { waitFor } from "@/utils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Switch } from "../ui/switch";

const formSchema = z.discriminatedUnion('alquila', [
  z.object({
    alquila: z.literal(true),
    montoAlquila: z.string().refine(val => /^[1-9]\d{0,6}$/.test(val), { message: "El monto debe ser un número entero en un rango válido" }),
    incluyeExpensasAlquila: z.boolean(),
  }),
  z.object({
    alquila: z.literal(false),
    estaHabitadaNoAlquila: z.boolean(),
    razonNoAlquila: z.string().min(1, { message: "La razón por la que no alquila es requerida" }),
  }),
]);


type FormSchema = z.infer<typeof formSchema>;

const FormCondicional = () => {
  const [ btnLoading, setBtnLoading ] = useState(false);

  const defaultAlquila = true;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultAlquila
      ? { alquila: defaultAlquila, montoAlquila: "", incluyeExpensasAlquila: true }
      : { alquila: defaultAlquila, estaHabitadaNoAlquila: false, razonNoAlquila: "" },
  });

  const alquila = useWatch({
    control: form.control,
    name: "alquila",
  });

  const handleSubmit = async (values: FormSchema) => {
    console.log('Datos enviados:', values);

    setBtnLoading(true);
    const segundosRandom = Math.floor(Math.random() * 4) + 2;
    await waitFor(segundosRandom * 1000);
    toast.success("Formulario enviado");
    setBtnLoading(false);
  }

  useEffect(() => {
    if (alquila) {
      form.setValue("razonNoAlquila", "");
      form.setValue("estaHabitadaNoAlquila", false);
    } else {
      form.setValue("montoAlquila", "");
      form.setValue("incluyeExpensasAlquila", true);
    }
  }, [alquila]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, e => console.log('error', e))} className="p-10 flex flex-col gap-6 border rounded">
        <FormField
          control={form.control}
          name="alquila"
          render={({ field }) => (
            <div className="flex flex-col">
              <FormItem className="my-4 flex items-center gap-4 rounded-lg border p-4">
                <FormControl className="flex items-center">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div style={{ margin: 0 }} className="flex items-center">
                  <FormLabel className="max-md:text-xs">Alquila</FormLabel>
                </div>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />

        {
          alquila &&
          <>
            <FormField
              control={form.control}
              name="montoAlquila"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto del alquiler</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incluyeExpensasAlquila"
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormItem className="my-4 flex items-center gap-4 rounded-lg border p-4">
                    <FormControl className="flex items-center">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div style={{ margin: 0 }} className="flex items-center">
                      <FormLabel className="max-md:text-xs">Incluye expensas</FormLabel>
                    </div>
                  </FormItem>
                  <FormMessage />
                </div>
              )}
            />
          </>
        }
        { !alquila &&
          <>
            <FormField
              control={form.control}
              name="razonNoAlquila"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo por el cual no alquila</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estaHabitadaNoAlquila"
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormItem className="my-4 flex items-center gap-4 rounded-lg border p-4">
                    <FormControl className="flex items-center">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div style={{ margin: 0 }} className="flex items-center">
                      <FormLabel className="max-md:text-xs">Está habitada?</FormLabel>
                    </div>
                  </FormItem>
                  <FormMessage />
                </div>
              )}
            />
          </>
        }
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
  )
}

export default FormCondicional;
