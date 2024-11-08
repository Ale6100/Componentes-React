import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Tabla from "./components/tabla/Tabla";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true  }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tabla" element={<Tabla />} />
      </Routes>
      <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton/>
    </BrowserRouter>
  )
}
