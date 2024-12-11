import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { CheckCircle, Settings2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table";
import { Data, datos } from "./data";
import { DataTable } from "./DataTable";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner";
import CardData from "./CardData";
import InfoLinks from "../InfoLinks";
import type { InfoLink } from "@/type";

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
              <Button title='Menú de acciones' variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0">
                <span className="sr-only">Abrir menú de acciones</span>
                <Settings2 className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:rotate-90" />
              </Button>
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

const data = datos;

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

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columns} data={data} txtPlaceholderFilter="Filtrar por todo menos email" columnsHidden={['pais']} Card={CardData} registrosRemarcados={[25, 29]} />
      </Card>

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-sm text-white text-wrap max-md:text-xs">
          {
            `<DataTable columns={columns} data={data} />`
          }
        </pre>

        <p>Donde ambos atributos contienen información de las columnas y datos</p>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/tabla/DataTable.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
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
            "Funcionará para cualquier tipo de configuración de columnas que se desee",
            "De manera predeterminada habrá un botón para ocultar o esconder las columnas que uno desee",
            "De manera predeterminada habrá un filtro con un ícono animado que funcionará para filtrar todos los campos. Se puede deshabilitar para campos específicos con la propiedad enableGlobalFilter",
            "De manera predeterminada habrá un paginado con un límite personalizado de 10 filas por página",
            "Se puede modificar la cantidad de cantidad de números de páginas que se muestran en el paginado",
            "Se puede activar un botón en cada columna para ordenar las filas en su orden ascendente o descendente. También en ese mismo botón se puede ocultar la columna. Se activa con el componente DataTableColumnHeader",
            "Se puede remarcar en rojo los registros que uno desee con el atributo registrosRemarcados",
            "De manera predeterminada la reordenación de columnas incluye animaciones para mejorar la experiencia visual.",
            "Si se pasa un atributo Card de tipo componente, servirá como componente plantilla donde se renderizarán los datos de cada fila en formato mobile",
            "Es posible agregar un skeleton de carga de datos si se pasa un atributo que indique que los datos se están cargando",
            "Es posible ocultar columnas por defecto con el atributo columnsHidden",
            "Es posible cambiar el placeholder del filtro",
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
