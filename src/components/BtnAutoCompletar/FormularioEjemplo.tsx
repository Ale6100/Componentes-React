import { waitFor } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { AtSign, CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import BtnAutocompletarr from "./BtnAutocompletar";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Genero = {
  m: 'Masculino',
  f: 'Femenino',
  o: 'Otro',
}

const items = [
  {
    id: "html",
    label: "HTML",
  },
  {
    id: "css",
    label: "CSS",
  },
  {
    id: "js",
    label: "JavaScript",
  },
  {
    id: "mongo",
    label: "MongoDB",
  },
  {
    id: "express",
    label: "ExpressJS",
  },
  {
    id: "react",
    label: "ReactJS",
  },
  {
    id: "node",
    label: "NodeJS",
  }
] as const;

const estudios = [
  {
    id: "prim",
    label: "Primario",
  },
  {
    id: "secun",
    label: "Secundario",
  },
  {
    id: "terc",
    label: "Terciario",
  },
  {
    id: "univ",
    label: "Universitario",
  }
]

const formSchema = z.object({
  username: z.string()
    .min(3, { message: "El nombre de usuario debe contener al menos 3 carácteres"})
    .max(20, { message: "El nombre de usuario no puede contener más de 20 carácteres"})
    .regex(/^[a-zA-Z0-9]+$/, { message: "El nombre de usuario solo puede contener letras y números"}),
  mail: z.string()
    .email({ message: "El correo electrónico no es válido"}),
  gender: z.enum(Object.keys(Genero) as [string, ...string[]], { message: "El género es requerido" }),
  knowledge: z.array(z.enum(items.map(item => item.id) as [string, ...string[]]), { message: "El conocimiento es requerido" }),
  birthdate: z.date({ message: "La fecha de nacimiento es requerida" }),
  studies: z.enum(estudios.map(item => item.id) as [string, ...string[]], { message: "Los estudios son requeridos" }),
  check: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function FormularioEjemplo() {
  const [ btnLoading, setBtnLoading ] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      mail: "",
      gender: "",
      knowledge: [],
      birthdate: new Date(),
      studies: "",
      check: false,
    }
  });

  const handleAutofill = (data: FormSchema) => {
    form.setValue("username", data.username);
    form.setValue("mail", data.mail);
    form.setValue('gender', data.gender);
    form.setValue('knowledge', data.knowledge);
    form.setValue('birthdate', data.birthdate);
    form.setValue('studies', data.studies);
    form.setValue("check", data.check);
  };

  const handleSubmit = async (values: FormSchema) => {
    console.log('Datos enviados:', values);

    setBtnLoading(true);
    const segundosRandom = Math.floor(Math.random() * 4) + 2;
    await waitFor(segundosRandom * 1000);
    toast.success("Formulario enviado");
    setBtnLoading(false);
  }

  return (
    <>
      <div className="flex justify-center mb-4">
        <BtnAutocompletarr className="border border-black" schema={formSchema} onAutofill={handleAutofill} />
      </div>

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
                  Input text
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
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input className="peer ps-9" placeholder="pablo@gmail.com" type="email" {...field} />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Input email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-52">
                    {
                      Object.entries(Genero).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="knowledge"
            render={() => (
              <FormItem>
                <FormLabel className="text-base">Conocimientos</FormLabel>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="knowledge"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormDescription>
                  Input checkbox
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={date => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Input date
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studies"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Mayor estudio alcanzado</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} value={field.value} className="flex flex-col space-y-1" >
                    {
                      estudios.map(item => (
                        <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={item.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      ))
                    }
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Input radio
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="check"
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
                    <FormLabel className="max-md:text-xs">Aceptar términos y condiciones</FormLabel>
                  </div>
                </FormItem>
                <FormDescription>
                  Otro input checkbox
                </FormDescription>
                <FormMessage />
              </div>
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
    </>
  )
}
