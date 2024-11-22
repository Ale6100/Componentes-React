import { Check, Circle } from 'lucide-react'

/**
 * Representa un formulario en la lista de formularios.
 * @typedef {Object} FormItem
 * @property {number} id - Identificador único del formulario.
 * @property {string} label - Etiqueta que describe el formulario.
 * @property {boolean} [completado] - Indica si el formulario ha sido completado.
 */
type FormItem = {
  id: number
  label: string
  completado: boolean
}

/**
 * Props para el componente `ProgressForm`.
 * @typedef {Object} ProgressFormProps
 * @property {FormItem[]} formList - Lista de elementos que representan los pasos del formulario.
 * @property {number} formActual - Identificador del paso actual.
 * @property {string} [className] - Clase CSS opcional para personalizar el estilo del contenedor principal.
 */
type ProgressFormProps = {
  readonly formList: FormItem[]
  readonly formActual: number
  readonly className?: string
}

/**
 * Componente que muestra el progreso de un formulario como una lista de pasos.
 * Cada paso puede estar completado, ser el actual o estar pendiente.
 *
 * @component
 * @param {ProgressFormProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa el progreso del formulario.
 */
export default function ProgressForm({ formList, formActual, className }: ProgressFormProps): JSX.Element {
  return (
    <ol className={`flex justify-evenly gap-1 flex-wrap ${className ?? ''}`}>
      {formList.map(item => {
        const isCompleted = item.completado
        const isCurrent = item.id === formActual

        return (
          <li key={item.id} className='flex items-center' >
            <div className="flex flex-col items-center justify-center">
              <span className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${isCompleted ? 'text-primary-foreground' : isCurrent ? 'text-primary' : '' }`} >
                {isCompleted ? (
                  <Check className="w-8 h-8 text-green-500"/>
                ) : <Circle className="w-8 h-8 text-blue-500"/>}
              </span>
              <span className={`mt-2 text-sm max-md:text-xs font-medium text-center ${isCurrent ? 'text-black font-extrabold' : 'text-gray-700 font-normal'}`}>
                {item.label}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
