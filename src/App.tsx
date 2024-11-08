import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Tabla from "./components/tabla/Tabla";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true  }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tabla" element={<Tabla />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton/>
    </BrowserRouter>
  )
}
