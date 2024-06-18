import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reports/styles.css";
import aetoPng from "../assets/aeto_vectorized.png";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";
import { Chart } from "react-google-charts";

/* hooks */
import useGetPortadaInfo from "../hooks/reporte-FIT/useGetPortadaInfo";
import useGetResumenFlotaPorVehiculo from "../hooks/reporte-FIT/useGetResumenFlotaPorVehiculo";
import useGetResumenLocalizacionPorVehiculo from "../hooks/reporte-FIT/useGetResumenLocalizacionPorVehiculo";
import useGetResumenObservaciones from "../hooks/reporte-FIT/useGetResumenObservaciones";
import useGetDimensionesLlanta from "../hooks/reporte-FIT/useGetDimensionesLlanta";
import useGetMarcasLlanta from "../hooks/reporte-FIT/useGetMarcasLlanta";
import useGetVidaLlanta from "../hooks/reporte-FIT/useGetVidaLlanta";
import useGetAnalisisPresion from "../hooks/reporte-FIT/useGetAnalisisPresion";
import useGetPresionPorTipoEje from "../hooks/reporte-FIT/useGetPresionPorTipoEje";
import useGetAnalisisProfundidad from "../hooks/reporte-FIT/useGetAnalisisProfundidad";

const ReporteFIT = () => {
  const { results: portadaInfo, state: portadaInfoState } = useGetPortadaInfo();

  const {
    results: resumenFlotaPorVehiculo,
    state: resumenFlotaPorVehiculoState,
    sucursales,
  } = useGetResumenFlotaPorVehiculo();

  const { results: resumenLocalizacion, state: resumenLocalizacionState } =
    useGetResumenLocalizacionPorVehiculo();

  const { results: resumenObservaciones, state: resumenObservacionesState } =
    useGetResumenObservaciones();

  const { results: dimensionesLlanta, state: dimensionesLlantaState } =
    useGetDimensionesLlanta();

  const { results: marcasLlanta, state: marcasLlantaState } =
    useGetMarcasLlanta();

  const { results: analisisPresion, state: analisisPresionState } =
    useGetAnalisisPresion();

  const { results: vidaLLanta, state: vidaLLantaState } = useGetVidaLlanta();

  const { results: presionTipoEje, state: presionTipoEjeState } =
    useGetPresionPorTipoEje();

  const { results: analisisProfundidad, state: analisisProfundidadState } =
    useGetAnalisisProfundidad();

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
            Para la compañia{" "}
            {portadaInfoState === "loaded" && portadaInfo?.compania},
            <span className="ml-1">
              {portadaInfoState === "loaded" && portadaInfo?.ubicaciones}
            </span>
          </h2>
          <h2 className="text-xl">
            {portadaInfoState === "loaded" && portadaInfo?.fechas}
          </h2>
          {portadaInfoState === "loading" && <LoadingIndicator />}
          {portadaInfoState === "loaded" && portadaInfo?.imagen && (
            <img
              src={portadaInfo?.imagen}
              alt="logo de la compañia API"
              className="w-[900px] h-[420px] mt-5 mx-auto object-contain"
            />
          )}
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
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Icono</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {resumenObservaciones.map((ob) => (
                    <tr key={ob.observaciones__observacion}>
                      <td
                        className={
                          ob.observaciones__icono
                            ? `${ob.observaciones__icono} text-5xl text-center`
                            : "icon-thumb_down text-6xl text-center"
                        }
                      ></td>
                      <td>{ob.observaciones__observacion}</td>
                      <td>{ob.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          )}
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10">Dimensiones de un neumático</h2>
            </header>
            {dimensionesLlantaState === "loading" && <LoadingIndicator />}
            {dimensionesLlantaState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={dimensionesLlanta}
                width="100%"
                height="500px"
                legendToggle
              />
            )}
          </article>
          <article>
            <header>
              <h2 className="text-xl mt-10"> Marca de un neumático</h2>
            </header>
            {marcasLlantaState === "loading" && <LoadingIndicator />}
            {marcasLlantaState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={marcasLlanta}
                width="100%"
                height="500px"
                legendToggle
              />
            )}
          </article>
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10">Vida de neumático</h2>
            </header>
            {vidaLLantaState === "loading" && <LoadingIndicator />}
            {vidaLLantaState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={vidaLLanta}
                width="100%"
                height="500px"
                legendToggle
              />
            )}
          </article>
          <article>
            <header>
              <h2 className="text-xl mt-10">Analisis de presión</h2>
            </header>
            {analisisPresionState === "loading" && <LoadingIndicator />}
            {analisisPresionState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={analisisPresion}
                width="100%"
                height="500px"
                legendToggle
              />
            )}
          </article>
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10">Presión por tipo de eje</h2>
            </header>
            {presionTipoEjeState === "loading" && <LoadingIndicator />}
            {presionTipoEjeState === "loaded" && (
              <div className="flex flex-wrap">
                <Chart
                  chartType="PieChart"
                  options={{ is3D: true }}
                  data={presionTipoEje?.dirrecion}
                  width="450px"
                  height="400px"
                  legendToggle
                />
                <Chart
                  chartType="PieChart"
                  options={{ is3D: true }}
                  data={presionTipoEje?.traccion}
                  width="420px"
                  height="400px"
                  legendToggle
                />
                <Chart
                  chartType="PieChart"
                  options={{ is3D: true }}
                  data={presionTipoEje?.arrastre}
                  width="420px"
                  height="400px"
                  legendToggle
                />
              </div>
            )}
          </article>
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10">Análisis de profundidad</h2>
            </header>
            {analisisProfundidadState === "loading" && <LoadingIndicator />}
            {analisisProfundidadState === "loaded" && (
              <div className="flex justify-center">
                <Chart
                  chartType="Bar"
                  options={{ is3D: true }}
                  data={analisisProfundidad}
                  width="80%"
                  height="500px"
                  legendToggle
                  className="mt-10 ml-[7%] "
                />
              </div>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default ReporteFIT;
