import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AlertIndex from "./components/Alert/AlertIndex";
import AutoCompletar from "./components/BtnAutoCompletar/AutoCompletar";
import Formulario from "./components/Formulario/Formulario";
import Home from "./components/Home";
import Loading from "./components/BtnLoading/FormLoading";
import NavBar from "./components/NavBar";
import NotFound from "./components/Page404/NotFound";
import Page404 from "./components/Page404/Page404";
import Progressindex from "./components/ProgressForm/ProgressIndex";
import Tabla from "./components/tabla/Tabla";
import IndexProgressCircle from "./components/ProgressCircle/IndexProgressCircle";
import ErrorInternoIndex from "./components/ErrorInterno/ErrorInternoIndex";

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true  }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tabla" element={<Tabla />} />

        <Route path="/btnAutoCompletar" element={<AutoCompletar />} />

        <Route path="/btnLoading" element={<Loading />} />

        <Route path="/progress" element={<Progressindex />} />

        <Route path="/alert" element={<AlertIndex />} />

        <Route path="/progressCircle" element={<IndexProgressCircle />} />

        <Route path="/error404" element={<Page404 />} />

        <Route path="/errorInterno" element={<ErrorInternoIndex />} />

        <Route path="/formulario" element={<Formulario />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <a className='fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[0.25vw] transition-all duration-100' href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener">Desarrollado por Alejandro P</a>
      <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton/>
    </BrowserRouter>
  )
}
