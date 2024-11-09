import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Tabla from "./components/tabla/Tabla";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "./components/NotFound";
import Formulario from "./components/Formulario/Formulario";
import AutoCompletar from "./components/BtnAutoCompletar/AutoCompletar";
import Pending from "./components/BtnPending/Pending";

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true  }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tabla" element={<Tabla />} />

        <Route path="/formulario" element={<Formulario />} />

        <Route path="/btnAutoCompletar" element={<AutoCompletar />} />

        <Route path="/btnPending" element={<Pending />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <a className='fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[0.25vw] transition-all duration-100' href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener">Desarrollado por Alejandro P</a>
      <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton/>
    </BrowserRouter>
  )
}
