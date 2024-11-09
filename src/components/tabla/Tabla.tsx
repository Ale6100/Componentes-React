import { CheckCircle, MoreVertical } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTable } from "./DataTable";
import CardData from "./CardData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { InfoLink } from "@/type";
import InfoLinks from "../InfoLinks";

export type Data = {
  id: number;
  nombre: string;
  apellido: string;
  email: `${string}@${string}.${string}`;
  pais: string;
}

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "apellido",
    header: 'Apellido'
  },
  {
    accessorKey: "email",
    enableGlobalFilter: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "pais",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title= "País" />
    ),
  },
  {
    accessorKey: "acciones",
    header: "Acciones",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <div className='w-full flex justify-center'>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <MoreVertical className="w-5 h-5" />
              <span className="sr-only">Abrir menú de acciones</span>
            </button>
          </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => toast.info(`Se pretende editar el dato con id ${row.original.id}. No funciona, es sólo un ejemplo`)} className='cursor-pointer'>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(`Se pretende eliminar el dato con id ${row.original.id}. No funciona, es sólo un ejemplo`)} className='cursor-pointer'>Eliminar</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const data: Data[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "JuanPerez@gmail.com",
    pais: "Argentina",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "Gómez",
    email: "Maria@outlook.com",
    pais: "Brasil",
  },
  {
    id: 3,
    nombre: "Federico",
    apellido: "Martínez",
    email: "pp@photmail.com",
    pais: "Perú",
  },
]

const infoLinks: InfoLink[] = [
  {
    name: "data-table",
    description: "de Shadcn",
    url: "https://ui.shadcn.com/docs/components/data-table",
  },
  {
    name: "react-table",
    description: "de Tanstack",
    url: "https://tanstack.com/table/v8/docs/introduction",
  },
  {
    description: "El principio de este video, para hacer un filtro global",
    url: 'https://youtu.be/ZG2_vPlQA8Q?si=qbtlQC4JmmMPiLLR'
  },
  {
    name: '@formkit/auto-animate',
    description: 'de FormKit',
    url: 'https://auto-animate.formkit.com/'
  }
]

export default function Tabla() {
  return (
    <section className="max-w-5xl w-full mx-auto my-4 flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Tabla</h1>

      <p className="text-center">Una tabla de datos interactiva y personalizable que se convierte en una lista de cards en formato mobile</p>

      <DataTable columns={columns} data={data} txtPlaceholderFilter="Filtrar por todo menos email" columnsHidden={['pais']} Card={CardData}/>

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
            "Funcionará para cualquier tipo de configuración de columnas que se desee",
            "De manera predeterminada habrá un botón para ocultar o esconder las columnas que uno desee",
            "De manera predeterminada habrá un filtro y funcionará para todos los campos. Se puede deshabilitar para campos específicos con la propiedad enableGlobalFilter",
            "Se puede activar un botón en cada columna para ordenar las filas en su orden ascendente o descendente. También en ese mismo botón se puede ocultar la columna. Se activa con el componente DataTableColumnHeader",
            "De manera predeterminada la reordenación de columnas incluye animaciones para mejorar la experiencia visual.",
            "Si se pasa un atributo Card de tipo componente, servirá como componente plantilla donde se renderizarán los datos de cada fila en formato mobile",
            "Es posible ocultar columnas por defecto con el atributo columnsHidden",
            "Es posible cambiar el placeholder del filtro",
            "Es posible pasar un className para personalizar el contenedor padre",
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
