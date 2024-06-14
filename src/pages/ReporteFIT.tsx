import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reports/styles.css";
import aetoPng from "../assets/aeto_vectorized.png";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";

/* hooks */
import useGetResumenFlotaPorVehiculo from "../hooks/reporte-FIT/useGetResumenFlotaPorVehiculo";
import useGetResumenLocalizacionPorVehiculo from "../hooks/reporte-FIT/useGetResumenLocalizacionPorVehiculo";
import useGetResumenObservaciones from "../hooks/reporte-FIT/useGetResumenObservaciones";
// import useGetDimensionesLlanta from "../hooks/reporte-FIT/useGetDimensionesLlanta";
// import useGetMarcasLlanta from "../hooks/reporte-FIT/useGetMarcasLlanta";
// import useGetVidaLlanta from "../hooks/reporte-FIT/useGetVidaLlanta";
// import useGetAnalisisProfundidad from "../hooks/reporte-FIT/useGetAnalisisProfundidad";

const ReporteFIT = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const {
    results: resumenFlotaPorVehiculo,
    state: resumenFlotaPorVehiculoState,
    sucursales,
  } = useGetResumenFlotaPorVehiculo();

  const { results: resumenLocalizacion, state: resumenLocalizacionState } =
    useGetResumenLocalizacionPorVehiculo();
  const { results: resumenObservaciones, state: resumenObservacionesState } =
    useGetResumenObservaciones();
  // const {results: dimensionesLlanta, state: dimensionesLlantaState} = useGetDimensionesLlanta()
  // const {results: marcasLlanta, state: marcasLlantaState} = useGetMarcasLlanta()
  // const {results: vidaLLanta, state: vidaLLantaState} = useGetVidaLlanta()
  // const {results: analisisProfundidad, state: analisisProfundidadState} = useGetAnalisisProfundidad()

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte taller FIT`,
  });

  return (
    <>
      <div className="w-full flex justify-end gap-[2rem]">
        <button
          className="bg-black text-white rounded-2xl hover:bg-gray-800 p-3 my-2 text-xl "
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          Descargar PDF
        </button>
      </div>
      <main ref={contentToPrint}>
        <section className="main-page">
          <img src={aetoPng} className="logo" alt="Logo-aeto" />
          <h1>Análisis de la inspección de flota (FIT)</h1>
          <h2 className="text-2xl">
            Para la compañia API,
            <span className="ml-1">
              {sucursales.map((suc, i) =>
                i === sucursales.length - 1 ? `${suc}` : `${suc}, `
              )}
            </span>
          </h2>
          <h2 className="text-xl">
            {startDate} - {endDate}
          </h2>
          <img
            src="LOGO HERE"
            alt="logo de la compañia API"
            className="w-[900px] h-[420px] mt-5 mx-auto object-contain"
          />
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10">
                Resumen de la flota por clase de vehículo
              </h2>
            </header>
            {resumenFlotaPorVehiculoState === "loading" && <LoadingIndicator />}

            {resumenFlotaPorVehiculoState === "loaded" &&
              sucursales.map((suc) => (
                <div key={suc}>
                  <div className="section-header">
                    <h4>{suc}</h4>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Clase de vehículos</th>
                        <th># Vehículos Inspeccionados</th>
                        <th># Vehículos en la flota</th>
                        <th>% Vehículos inspeccionados</th>
                        <th># Neumáticos inspeccionados</th>
                        <th># Neumáticos en la flota</th>
                        <th>% De neumáticos inspeccionados</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumenFlotaPorVehiculo &&
                        resumenFlotaPorVehiculo[suc].map((resumen) => (
                          <tr key={`${suc}-${resumen.clase ?? resumen.name}`}>
                            <td>
                              {resumen.clase ?? resumen.name.toUpperCase()}
                            </td>
                            <td>{resumen.vehiculos_inspeccionados}</td>
                            <td>
                              {resumen.vehiculos_flota ??
                                resumen.numero_vehiculos_flota}
                            </td>
                            <td>
                              {resumen.porcentaje_inspeccionados ??
                                resumen.porcentaje_vehiculos_inspeccionados}
                            </td>
                            <td>{resumen.llantas_inspeccionados}</td>
                            <td>
                              {resumen.llantas_flota ??
                                resumen.numero_neumaticos_flota}
                            </td>
                            <td>
                              {resumen.porcentaje_llantas_inspeccionados ??
                                resumen.porceentaje_neumaticos_inspeccionados}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </article>
          <article>
            <h2 className="text-xl mt-10">
              Resumen de localizaciones por clase de vehículo
            </h2>
            {resumenLocalizacionState === "loading" && <LoadingIndicator />}
            {resumenLocalizacionState === "loaded" && (
              <>
                {sucursales.map((suc) => (
                  <div key={suc}>
                    <header>
                      <div className="section-header">
                        <h4>{suc}</h4>
                      </div>
                    </header>
                    {Object.keys(resumenLocalizacion[suc]).map((loc) => (
                      <div key={loc}>
                        <div className="sub-header">
                          <h5>{loc}</h5>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th>Clase de vehículos</th>
                              <th># Vehículos Inspeccionados</th>
                              <th>% Vehículos inspeccionados</th>
                              <th># Neumáticos inspeccionados</th>
                              <th>% Neumáticos inspeccionados</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resumenLocalizacion[suc][loc].map((resumen) => (
                              <tr key={resumen.clase ?? resumen.name}>
                                <td>
                                  {resumen.clase ?? resumen.name.toUpperCase()}
                                </td>
                                <td>{resumen.vehiculos_inspeccionados}</td>
                                <td>
                                  {resumen.porcentaje_inspeccionados ??
                                    resumen.porcentaje_vehiculos_inspeccionados}
                                </td>
                                <td>{resumen.llantas_inspeccionados}</td>
                                <td>
                                  {resumen.porcentaje_llantas_inspeccionados ??
                                    resumen.porceentaje_neumaticos_inspeccionados}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </article>
        </section>
        <section className="page">
          <header>
            <h2 className="text-xl mt-10">Inspecciones</h2>
          </header>
          <article>Inspecciones here</article>
        </section>
        <section className="page">
          <header>
            <h2 className="text-xl mt-10">Resumen de observaciones</h2>
          </header>
          {resumenObservacionesState === "loading" && <LoadingIndicator />}
          {resumenObservacionesState === "loaded" && (
            <article>
              {resumenObservaciones.map((ob) => (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Icono</th>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={`${ob.observaciones__icono} text-6xl text-center` ?? "icon-thumb_down text-6xl text-center"}></td>
                      <td>{ob.observaciones__observacion}</td>
                      <td>{ob.cantidad}</td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </article>
          )}
        </section>
      </main>
    </>
  );
};

export default ReporteFIT;
