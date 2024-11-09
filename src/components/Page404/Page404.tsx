import NotFound from "./NotFound";
import { Separator } from "../ui/separator";

export default function Page404() {
  return (
    <section className="max-w-5xl w-full mx-auto my-4  flex flex-col gap-4 px-1">
      <h1 className="text-3xl font-bold text-center">Página de error 404 Not Found</h1>

      <p className="text-center">Componente para renderizar el mensaje de error mencionado</p>

      <NotFound />

      <Separator />

      <div className="p-4 border rounded-lg bg-secondary flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Uso</h2>

        <p>La versión base del componente se invoca así:</p>

        <pre className="bg-primary p-4 rounded-lg text-sm text-white text-wrap max-md:text-xs">
          {
            `<NotFound />`
          }
        </pre>

        <a href="https://github.com/Ale6100/Componentes-React/blob/main/src/components/Page404/NotFound.tsx" target="_blank" rel='noopener' className="text-blue-700">Ver código</a>
      </div>

      <Separator />
    </section>
  );
}