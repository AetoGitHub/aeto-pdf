import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReporteTaller from "./pages/ReporteTaller";
import ReporteFIT from "./pages/ReporteFIT";
import ReporteAlertas from "./pages/ReporteAlertas";
import ReporteNecesidadesInmediatas from "./pages/ReporteNecesidadesInmediatas";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="max-w-[1200px] mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/reporte-taller/:reportId" element={<ReporteTaller />}></Route>
            <Route path="/reporte-fit/" element={<ReporteFIT />}></Route>
            <Route path="/reporte-necesidades-inmediatas/" element={<ReporteNecesidadesInmediatas />}></Route>
            <Route path="/reporte-alertas/" element={<ReporteAlertas />}></Route>
            
            <Route
              path="*"
              element={
                <h1 className="text-3xl text-center my-10">
                  La página a la que intentas entrar no existe
                </h1>
              }
            ></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
