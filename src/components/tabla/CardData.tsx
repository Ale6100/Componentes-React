import { Cell, flexRender, Row } from "@tanstack/react-table"
import type { Data } from "./Tabla"
import { Card, CardContent } from "@/components/ui/card"

/**
 * Props del componente Card
 * @property row - Fila de la tabla a renderizar que representa a los datos
 */
type CardDataProps = {
  readonly row: Row<Data>
}

/**
 * Componente CardData - Tarjeta que muestra información en formato mobile.
 * @param {CardDataProps} props - Propiedades del componente
 * @returns {JSX.Element} - Tarjeta de visualización
 */
export default function CardData({ row }: CardDataProps): JSX.Element {

  /**
   * getCell - Obtiene la celda correspondiente al ID de columna especificada.
   * @param {string} cellId - ID de la columna a obtener
   * @returns {Cell<DDJJ, unknown> | undefined} - Celda que coincide con el ID, o undefined si no se encuentra
   */
  const getCell = (cellId: string): Cell<Data, unknown> | undefined => {
    return row.getVisibleCells().find(cell => cell.column.id === cellId)
  }

  /**
   * renderColumn - Renderiza el contenido de la columna especificada.
   * @param {string} cellId - ID de la columna a renderizar
   * @returns {JSX.Element | null} - Contenido de la celda como JSX, o null si no existe la celda
   */
  const renderColumn = (cellId: string): JSX.Element | null => {
    const cell = getCell(cellId)
    return cell ?
      <div key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    : null
  }

  const id = renderColumn('id');
  const nombre = renderColumn('nombre')
  const apellido = renderColumn('apellido')
  const email = renderColumn('email')
  const pais = renderColumn('pais')
  const acciones = renderColumn('acciones')
  const paisValue = getCell('pais')?.getValue()

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex gap-4 justify-evenly">
          {
              id && (
                <div className="flex flex-1 items-center space-x-4">
                  {id}
                </div>
              )
            }
            {
              nombre && (
                <div className="flex items-center space-x-4">
                  {nombre}
                </div>
              )
            }
            {
              apellido && (
                <div className="flex items-center space-x-4">
                  {apellido}
                </div>
              )
            }
        </div>
        <div className="flex justify-between">
          {
            email && (
              <div className="flex items-center space-x-4">
                {email}
              </div>
            )
          }
          {
            pais && (
              <div className={"flex items-center space-x-4 " + (paisValue == 'Argentina' ? 'text-green-700' : 'text-blue-700')}>
                {pais}
              </div>
            )
          }
          {
            acciones && (
              <div className="flex items-center space-x-4">
                {acciones}
              </div>
            )
          }
        </div>
      </CardContent>
    </Card>
  )
}
