import { Check, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Representa un formulario en la lista de formularios.
 * @typedef {Object} FormItem
 * @property {number} id - Identificador único del formulario.
 * @property {string} label - Etiqueta que describe el formulario.
 * @property {boolean} [completado] - Indica si el formulario ha sido completado.
 * @property {string} url - URL del formulario.
 */
type FormItem = {
  id: number
  label: string
  completado: boolean
  url: string
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
    <div className={`flex justify-evenly gap-1 flex-wrap ${className ?? ''}`}>
      {formList.map((item, index) => {
        const isCompleted = item.completado;
        const isCurrent = item.id === formActual;

        const shouldEnabled = formList.slice(0, index + 1).every(prevItem => prevItem.completado);

        const stepContent = (
          <div className="flex flex-col items-center justify-center">
            <span className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${isCompleted ? 'text-primary-foreground' : isCurrent && 'text-primary'}`}>
              {
                isCompleted
                  ? <Check className="w-8 h-8 text-green-500" />
                  : <Circle className="w-8 h-8 text-blue-500" />
              }
            </span>
            <span className={`mt-2 text-sm max-md:text-xs font-medium text-center ${isCurrent ? 'text-black font-extrabold' : 'text-gray-700 font-normal'}`}>
              {item.label}
            </span>
          </div>
        );

        return shouldEnabled ? (
          <Link to={item.url} key={item.id} className='flex items-center' >
            {stepContent}
          </Link>
        ) : (
          <div key={item.id} className='flex items-center cursor-default opacity-90'>
            {stepContent}
          </div>
        );
      })}
    </div>
  );
}
