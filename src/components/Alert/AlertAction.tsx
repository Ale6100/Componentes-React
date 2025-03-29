"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AlertTriangle, Check, Info, Loader2, MessageCircleQuestion, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type TypeAlert = "warning" | "error" | "info" | "success" | "question" | "none"

export type BtnAlertActionConfig = {
  readonly text?: string
  readonly className?: string
  readonly onClick?: () => Promise<void>
}

interface AlertActionProps {
  readonly isOpen: boolean
  readonly onOpenChange: (isOpen: boolean) => void
  readonly title: string
  readonly description: string
  readonly configBtnAccept?: BtnAlertActionConfig
  readonly configBtnCancel?: BtnAlertActionConfig
  readonly btnsDisabled?: boolean
  readonly type?: TypeAlert
}

const typeColors = {
  warning: "text-amber-500 bg-amber-50 border-amber-200",
  error: "text-red-500 bg-red-50 border-red-200",
  info: "text-blue-500 bg-blue-50 border-blue-200",
  success: "text-emerald-500 bg-emerald-50 border-emerald-200",
  question: "text-violet-500 bg-violet-50 border-violet-200",
  none: "",
}

const typeIconColors = {
  warning: "text-amber-500",
  error: "text-red-500",
  info: "text-blue-500",
  success: "text-emerald-500",
  question: "text-violet-500",
  none: "",
}

const typeButtonColors = {
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
  error: "bg-red-500 hover:bg-red-600 text-white",
  info: "bg-blue-500 hover:bg-blue-600 text-white",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  question: "bg-violet-500 hover:bg-violet-600 text-white",
  none: "bg-primary hover:bg-primary/90",
}

const typeBgColors = {
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  success: "bg-emerald-500",
  question: "bg-violet-500",
  none: "bg-gray-500",
}

const TypeIcons = ({ type }: { type: TypeAlert }) => {
  const typeIcons = {
    warning: <AlertTriangle className="w-6 h-6" />,
    error: <X className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
    success: <Check className="w-6 h-6" />,
    question: <MessageCircleQuestion className="w-6 h-6" />,
    none: <></>,
  }

  return typeIcons[type]
}

const configBtnAcceptDefault: BtnAlertActionConfig = {
  text: "Aceptar",
  className: undefined,
  onClick: async () => {},
}

const configBtnCancelDefault: BtnAlertActionConfig = {
  text: "Cancelar",
  className: undefined,
  onClick: async () => {},
}

/**
 * Un componente Alert
 * Ofrece opciones personalizables para aceptar y continuar o cancelar.
 *
 * @component
 *
 * @param {AlertActionProps} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Estado que controla si la alerta está abierta o cerrada.
 * @param {(isOpen: boolean) => void} props.onOpenChange - Callback que se invoca cuando el usuario cierra la alerta.
 * @param {string} props.title - El título de la alerta.
 * @param {string} props.description - La descripción de la alerta.
 * @param {BtnAlertActionConfig}[ops.configBtnAccept] - Configuración del botón de aceptar.
 * @param {BtnAlertActionConfig}[ops.configBtnCancel] - Configuración del botón de cancelar.
 * @param {boolean} [props.btnsDisabled=false] - Estado que deshabilitará los botones cuando sea true.
 * @param {'warning' | 'error' | 'info' | 'success' | 'question' | 'none'} [props.type='none'] - El tipo de alerta.
 *
 * @returns {JSX.Element} El componente de alerta renderizado.
 */
export default function AlertAction({
  isOpen,
  onOpenChange,
  title,
  description,
  configBtnAccept = {},
  configBtnCancel = {},
  btnsDisabled = false,
  type = "none",
}: AlertActionProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<"btnCancel" | "btnAccept" | null>(null)

  const mergedConfigBtnAccept = {
    text: configBtnAccept.text ?? configBtnAcceptDefault.text,
    className: configBtnAccept.className ?? configBtnAcceptDefault.className,
    onClick: configBtnAccept.onClick ?? configBtnAcceptDefault.onClick,
  }
  const mergedConfigBtnCancel = {
    text: configBtnCancel.text ?? configBtnCancelDefault.text,
    className: configBtnCancel.className ?? configBtnCancelDefault.className,
    onClick: configBtnCancel.onClick ?? configBtnCancelDefault.onClick,
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-lg shadow-lg">
        {type !== "none" && (
          <div className={cn("absolute top-0 left-0 right-0 h-1.5 rounded-t-lg", typeBgColors[type])}></div>
        )}
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold flex items-center gap-3">
            {type !== "none" && (
              <div className={cn("p-2 rounded-full", typeColors[type])}>
                <span className={typeIconColors[type]}><TypeIcons type={type} /></span>
              </div>
            )}
            <span>{title}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-gray-600 leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:gap-0">
          <AlertDialogAction
            disabled={btnsDisabled || Boolean(isLoading)}
            className={cn(
              "font-medium transition-all duration-200 flex items-center justify-center",
              type !== "none" ? typeButtonColors[type] : "",
              isLoading === "btnAccept" ? "opacity-80" : "",
              mergedConfigBtnAccept.className,
            )}
            onClick={async e => {
              e.preventDefault()
              setIsLoading("btnAccept")
              try {
                await mergedConfigBtnAccept.onClick?.()
              } catch {/**/}
              setIsLoading(null)
              onOpenChange(false)
            }}
          >
            {isLoading === "btnAccept" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {mergedConfigBtnAccept.text}
          </AlertDialogAction>
          <AlertDialogCancel
            disabled={btnsDisabled || Boolean(isLoading)}
            className={cn(
              "font-medium transition-all duration-200 flex items-center justify-center",
              isLoading === "btnCancel" ? "opacity-80" : "",
              mergedConfigBtnCancel.className,
            )}
            onClick={async e => {
              e.preventDefault()
              setIsLoading("btnCancel")
              try {
                await mergedConfigBtnCancel.onClick?.()
              } catch {/**/}
              setIsLoading(null)
              onOpenChange(false)
            }}
          >
            {isLoading === "btnCancel" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {mergedConfigBtnCancel.text}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
