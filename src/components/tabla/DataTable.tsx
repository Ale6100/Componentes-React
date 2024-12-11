import { ArrowLeftCircle, ArrowRightCircle, LoaderCircle, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState, getFilteredRowModel, Column, Row } from "@tanstack/react-table"
import { ComponentType, isValidElement, useState } from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useMediaQuery } from "react-responsive"

interface DataTableProps<TData , TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  Card?: ComponentType<{ data: TData, row: Row<TData> }>;
  txtPlaceholderFilter?: string;
  columnsHidden?: Array<Extract<keyof TData, string>>;
  dataLoading?: boolean;
  pageSize?: number;
  cantPaginasAlrededor?: `${number}`;
  registrosRemarcados?: number[];
}

const TableSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
)

/**
 * Componente de tabla de datos configurable para visualizar y manipular grandes volúmenes de datos.
 * Permite ordenación, filtrado, visibilidad de columnas y adaptabilidad a diferentes tamaños de pantalla.
 *
 * @template TData - Tipo de los datos de cada fila.
 * @template TValue - Tipo del valor de cada celda.
 *
 * @param {DataTableProps<TData, TValue>} props - Propiedades del componente.
 * @param {ColumnDef<TData, TValue>[]} props.columns - Configuración de las columnas de la tabla.
 * @param {TData[]} props.data - Datos a mostrar en la tabla.
 * @param {string} [props.className] - Clase CSS opcional para personalizar estilos.
 * @param {React.ComponentType<{ data: TData, row: Row<TData> }>} [props.Card] - Componente de tarjeta opcional que, si se proporciona, reemplaza la visualización de formato de tabla por una lista de componentes `Card` en dispositivos móviles.
 * @param {string} [props.txtPlaceholderFilter="Filtrar..."] - Texto del placeholder para el input de filtro global.
 * @param {Array<Extract<keyof TData, string>>} [props.columnsHidden=[]] - Columnas inicialmente ocultas.
 * @param {boolean} [props.dataLoading=false] - Indica si los datos se están cargando.
 * @param {number} [props.pageSize=10] - Número de filas por página.
 * @param {string} [props.cantPaginasAlrededor='2'] - Cantidad de páginas alrededor de la página actual a mostrar en la paginación.
 * @param {number[]} [props.registrosRemarcados=[]] - Lista de IDs de registros que se destacarán en la tabla. Para que esta funcionalidad sea efectiva los datos deben incluir una propiedad id.
 *
 * @returns {JSX.Element} - Componente de tabla interactivo.
 */
export function DataTable<TData extends object, TValue>({ className, columns, data, Card, txtPlaceholderFilter = "Filtrar...", columnsHidden = [], dataLoading = false, pageSize = 10, cantPaginasAlrededor = '2', registrosRemarcados = []}: Readonly<DataTableProps<TData, TValue>>): JSX.Element {
  const [ sorting, setSorting ] = useState<SortingState>([])
  const [ columnVisibility, setColumnVisibility ] = useState<VisibilityState>(columnsHidden.reduce((acc, column) => ({ ...acc, [column]: false }), {}))
  const [ filtering, setFiltering ] = useState<string>("")
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const [ inputIsLoading, setInputIsLoading ] = useState(false);

  const [ parent ] = useAutoAnimate()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      sorting,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  })

  /**
   * Retorna el encabezado de la columna para mostrar en el menú de filtros.
   * Maneja encabezados definidos como funciones o cadenas.
   *
   * @param {Column<TData, unknown>} column - Columna para la cual se desea el encabezado.
   * @returns {string} - Texto del encabezado o un mensaje predeterminado si no está disponible.
   */
  const VisualizarFiltros = (column: Column<TData, unknown>): string => {
    if (typeof column.columnDef.header === "function") {
      // @ts-expect-error Pendiente: mejorar el tipado
      const headerElement = column.columnDef.header({ column });
      // @ts-expect-error Pendiente: mejorar el tipado
      return isValidElement(headerElement) ? headerElement.props.title : "Encabezado no disponible";
    } else if (typeof column.columnDef.header === "string") {
      return column.columnDef.header;
    } else {
      return "Encabezado no disponible";
    }
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIsLoading(true);
    setFiltering(e.target.value);

    setTimeout(() => {
      setInputIsLoading(false);
    }, 500);
  }

  const indexActualPage = table.getState().pagination.pageIndex;
  const cantidadPaginas = table.getPageCount();
  const pagAlrededor = parseInt(cantPaginasAlrededor);

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      <div className="flex gap-4 max-[360px]:flex-col-reverse">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {
              inputIsLoading ?
                <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" role="presentation" />
                :
                <Search size={16} strokeWidth={2} />
            }
          </div>
          <Input id="input-26" className="peer ps-9" placeholder={txtPlaceholderFilter} type="search" value={filtering} onChange={handleInputFilter} title="Filtrar resultados" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto max-[360px]:w-full" title="Mostrar u ocultar columnas">
            Ver más columnas
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                column => column.getCanHide()
              )
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={value =>
                      column.toggleVisibility(Boolean(value))
                    }
                  >
                    {VisualizarFiltros(column)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        {
          Card == null || isDesktop ?
          <Table className="rounded-md border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody ref={parent}>
              { dataLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <TableSkeleton />
                  </TableCell>
                </TableRow>
              ) :
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={registrosRemarcados.some(r => 'id' in row.original && r === row.original.id) ? 'bg-red-300' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sin resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          :
          <div ref={parent} className="flex flex-col gap-4">
            { dataLoading ? <TableSkeleton /> :
              table.getRowModel().rows.map((row, i) => (
                <Card key={row.id} data={data[i]} row={row} />
              ))
            }
          </div>
        }
        {
          cantidadPaginas > 1 && (
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}> <ArrowLeftCircle className="h-4 w-4" /> </Button>

              <Button variant="outline" size="sm" onClick={() => table.setPageIndex(0)} disabled={indexActualPage === 0} className={indexActualPage === 0 ? 'bg-primary text-primary-foreground' : ''}>1</Button>

              { indexActualPage > pagAlrededor + 1 && <Button variant="outline" size="icon" disabled> <MoreHorizontal className="h-4 w-4" /> </Button> }

              {Array.from({ length: cantidadPaginas }, (_, i) => {
                if (i === 0 || i === cantidadPaginas - 1) return null;
                if (i >= indexActualPage - pagAlrededor && i <= indexActualPage + pagAlrededor) {
                  return <Button key={i} variant="outline" size="sm" onClick={() => table.setPageIndex(i)}  disabled={indexActualPage === i} className={indexActualPage === i ? 'bg-primary text-primary-foreground' : ''}> {i + 1} </Button>;
                }
                return null;
              })}

              { indexActualPage < cantidadPaginas - pagAlrededor - 2 && <Button variant="outline" size="icon" disabled> <MoreHorizontal className="h-4 w-4" /> </Button> }

              { cantidadPaginas > 1 && <Button variant="outline" size="sm" onClick={() => table.setPageIndex(cantidadPaginas - 1)} disabled={indexActualPage === cantidadPaginas - 1} className={indexActualPage === cantidadPaginas - 1 ? 'bg-primary text-primary-foreground' : ''}> {cantidadPaginas} </Button> }

              <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}> <ArrowRightCircle className="h-4 w-4" /> </Button>
            </div>
          )
        }
    </div>
  )
}
