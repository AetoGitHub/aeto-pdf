import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reports/styles.css";
import aetoPng from "../assets/aeto_vectorized.png";

import { useRef, useEffect, useCallback, useState } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";
import { Chart } from "react-google-charts";
import { formatDate } from "../utils/formatDate";
import SingleTireAxle from "../components/axles/SingleTireAxle";
import DoubleTireAxle from "../components/axles/DoubleTireAxle";
import QuadTireAxle from "../components/axles/QuadTireAxle";

/* hooks */
import useGetPortadaInfo from "../hooks/reporte-FIT/useGetPortadaInfo";
import useGetResumenFlotaPorVehiculo from "../hooks/reporte-FIT/useGetResumenFlotaPorVehiculo";
import useGetResumenLocalizacionPorVehiculo from "../hooks/reporte-FIT/useGetResumenLocalizacionPorVehiculo";
import useGetInspecciones from "../hooks/reporte-FIT/useGetInspecciones";
import useGetResumenObservaciones from "../hooks/reporte-FIT/useGetResumenObservaciones";
import useGetDimensionesLlanta from "../hooks/reporte-FIT/useGetDimensionesLlanta";
import useGetMarcasLlanta from "../hooks/reporte-FIT/useGetMarcasLlanta";
import useGetVidaLlanta from "../hooks/reporte-FIT/useGetVidaLlanta";
import useGetAnalisisPresion from "../hooks/reporte-FIT/useGetAnalisisPresion";
import useGetPresionPorTipoEje from "../hooks/reporte-FIT/useGetPresionPorTipoEje";
import useGetAnalisisProfundidad from "../hooks/reporte-FIT/useGetAnalisisProfundidad";
import useGetCambiosRecomendados from "../hooks/reporte-FIT/useGetCambiosRecomendados";
import useGetCambiosRecomendados30 from "../hooks/reporte-FIT/useGetCambiosRecomendados30";
import useGetCambiosRecomendados60 from "../hooks/reporte-FIT/useGetCambiosRecomendados60";
import useGetObservaciones from "../hooks/reporte-FIT/useGetObservaciones";

const ReporteFIT = () => {
  const [searchParams] = useSearchParams();
  const perdidaMensual = searchParams.get("perdida_mensual");
  const [allApisLoaded, setAllApisLoaded] = useState(false);

  const { results: portadaInfo, state: portadaInfoState } = useGetPortadaInfo();

  const {
    results: resumenFlotaPorVehiculo,
    state: resumenFlotaPorVehiculoState,
    sucursales,
  } = useGetResumenFlotaPorVehiculo();

  const { results: resumenLocalizacion, state: resumenLocalizacionState } =
    useGetResumenLocalizacionPorVehiculo();

  const { results: inspecciones, state: inspeccionesState } =
    useGetInspecciones();

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

  const { results: cambiosRecomendados, state: cambiosRecomendadosState } =
    useGetCambiosRecomendados();

  const { results: cambiosRecomendados30, state: cambiosRecomendados30State } =
    useGetCambiosRecomendados30();

  const { results: cambiosRecomendados60, state: cambiosRecomendados60State } =
    useGetCambiosRecomendados60();

  const { results: observaciones, state: observacionesState } =
    useGetObservaciones();

  const checkAllApisLoaded = useCallback(() => {
    const apiStates = [
      portadaInfoState,
      resumenFlotaPorVehiculoState,
      resumenLocalizacionState,
      inspeccionesState,
      resumenObservacionesState,
      dimensionesLlantaState,
      marcasLlantaState,
      analisisPresionState,
      vidaLLantaState,
      presionTipoEjeState,
      analisisProfundidadState,
      cambiosRecomendadosState,
      cambiosRecomendados30State,
      cambiosRecomendados60State,
      observacionesState,
    ];

    return apiStates.every((state) => state === "loaded");
  }, [
    portadaInfoState,
    resumenFlotaPorVehiculoState,
    resumenLocalizacionState,
    inspeccionesState,
    resumenObservacionesState,
    dimensionesLlantaState,
    marcasLlantaState,
    analisisPresionState,
    vidaLLantaState,
    presionTipoEjeState,
    analisisProfundidadState,
    cambiosRecomendadosState,
    cambiosRecomendados30State,
    cambiosRecomendados60State,
    observacionesState,
  ]);

  useEffect(() => {
    const isAllLoaded = checkAllApisLoaded();
    setAllApisLoaded(isAllLoaded);
  }, [checkAllApisLoaded]);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte taller FIT`,
  });

  return (
    <>
      <div className="w-full flex justify-end gap-[2rem]">
        <button
          className={`rounded-2xl p-3 my-2 text-xl transition-colors duration-300 ${
            allApisLoaded
              ? "bg-black text-white hover:bg-gray-800 cursor-pointer fixed top-0 z-50"
              : "bg-gray-500 text-black cursor-not-allowed opacity-50 fixed top-0 z-50"
          }`}
          disabled={!allApisLoaded}
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          {allApisLoaded ? "Descargar PDF" : "Cargando PDF..."}
        </button>
      </div>
      <main
        ref={contentToPrint}
        style={{
          padding: "20px",
          margin: "30px 20px 20px 20px",
        }}
      >
        <section className="page">
          <img
            src={aetoPng}
            className="logo mx-auto my-[30px]"
            alt="Logo-aeto"
          />
          <h1 className="mx-auto my-10 text-center">
            Análisis de la inspección de flota (FIT)
          </h1>
          <h2 className="text-2xl text-center">
            Para la compañía{" "}
            {portadaInfoState === "loaded" && portadaInfo?.compania},
            <span className="ml-1 text-center">
              {portadaInfoState === "loaded" && portadaInfo?.ubicaciones}
            </span>
          </h2>
          <h2 className="text-xl text-center">
            {portadaInfoState === "loaded" && portadaInfo?.fechas}
          </h2>
          {portadaInfoState === "loading" && <LoadingIndicator />}
          {portadaInfoState === "loaded" && portadaInfo?.imagen && (
            <img
              src={portadaInfo?.imagen}
              alt="logo de la compañia"
              className="max-w-[1000px] h-[500px] my-[60px] mx-auto object-contain"
            />
          )}
        </section>
        <section className="page mb-[150px] p-8">
          <h1 className="mx-auto mt-[100px] my-[60px] text-center text-4xl font-bold border-b-2 border-gray-300 pb-6">
            ÍNDICE
          </h1>

          <div className="grid grid-cols-1 gap-16">
            <div className="space-y-16">
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#resumen-clase"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">📊</span>
                  Resumen de la flota por clase de vehículo
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#resumen-localizaciones"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">🗺️</span>
                  Resumen de localizaciones por clase de vehículo
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#inspecciones"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">🔍</span>
                  Inspecciones
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#resumen-observaciones"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">📝</span>
                  Resumen de observaciones
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#dimensiones-neumatico"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">📏</span>
                  Dimensiones de neumáticos
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#marca-neumatico"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">🏷️</span>
                  Marca de neumáticos
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#vida-neumatico"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">⏳</span>
                  Vida de neumáticos
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#analisis-presion"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">🔢</span>
                  Análisis de presión
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#presion-eje"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">🚗</span>
                  Presión por tipo de eje
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#analisis-profundidad"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">📊</span>
                  Análisis de profundidad
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a href="#cambios" className="flex items-center justify-center">
                  <span className="mr-3 text-2xl">🔄</span>
                  Cambios recomendados
                </a>
              </h2>
              <h2 className="text-2xl font-semibold hover:text-gray-600 transition-colors text-center">
                <a
                  href="#observaciones-comunicar"
                  className="flex items-center justify-center"
                >
                  <span className="mr-3 text-2xl">💬</span>
                  Observaciones a comunicar
                </a>
              </h2>
            </div>
          </div>
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10" id="resumen-clase">
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
                  <table className="w-full">
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
            <h2 className="text-xl mt-10" id="resumen-localizaciones">
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
            <h2 className="text-xl mt-10" id="inspecciones">
              Inspecciones
            </h2>
          </header>

          {inspeccionesState === "loading" && <LoadingIndicator />}

          {inspeccionesState === "loaded" &&
            sucursales.map((ub) => (
              <div key={ub}>
                <header className="mb-[1rem] section-header">{ub}</header>
                {inspecciones
                  ?.filter((inspeccion) => inspeccion.ubicacion == ub)
                  .map((inspeccionWrapper) => (
                    <div
                      className="page-break-before my-10"
                      key={`${ub}-${inspeccionWrapper.id}-${inspeccionWrapper.fecha}`}
                    >
                      <h4 className="border-y-[1px] border-y-[#222] mb-[1rem] p-[0.5rem]">{`Numero economico: ${inspeccionWrapper.numero_economico}`}</h4>
                      <div className="vehicle-inspection__column flex gap-3">
                        <div className="vehicle-inspection__data">
                          <table className="mb-1">
                            <tbody>
                              <tr>
                                <td>Marca</td>
                                <td>{inspeccionWrapper.marca}</td>
                              </tr>
                              <tr>
                                <td>Fecha/hora</td>
                                <td>{formatDate(inspeccionWrapper.fecha)}</td>
                              </tr>
                              <tr>
                                <td>Localidad</td>
                                <td>{inspeccionWrapper.aplicacion}</td>
                              </tr>
                              <tr>
                                <td>Modelo</td>
                                <td>{inspeccionWrapper.modelo}</td>
                              </tr>
                              <tr>
                                <td>Odómetro</td>
                                <td>{inspeccionWrapper.km ?? "None"}</td>
                              </tr>
                              <tr>
                                <td>Clase de vehículo</td>
                                <td>{inspeccionWrapper.clase_vehiculo}</td>
                              </tr>
                              <tr>
                                <td>Inspector</td>
                                <td>{inspeccionWrapper.inspectores}</td>
                              </tr>
                              <tr>
                                <td>Tipo de inspección</td>
                                <td>{inspeccionWrapper.tipo_de_evento}</td>
                              </tr>
                            </tbody>
                          </table>
                          {inspeccionWrapper.inspecciones.filter(
                            (inspeccion) => inspeccion.observaciones.length > 0
                          ).length > 0 && (
                            <table className="mb-1 min-w-[300px] ">
                              <thead>
                                <tr>
                                  <th>Observaciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <ul>
                                      {inspeccionWrapper.inspecciones.map(
                                        (inspeccion) =>
                                          inspeccion.observaciones.map((ob) => (
                                            <li
                                              key={ob.id}
                                              className="ml-2"
                                            >{`-${inspeccion.posicion}: ${ob.observacion}`}</li>
                                          ))
                                      )}
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}

                          {inspeccionWrapper.inspecciones.filter(
                            (inspeccion) =>
                              inspeccion.imagen !== null &&
                              Object.keys(inspeccion.imagen).length > 0
                          ).length > 0 && (
                            <table className="mb-1 min-w-[300px] ">
                              <thead>
                                <tr>
                                  <th>Imagenes</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <ul>
                                      {inspeccionWrapper.inspecciones.map(
                                        (inspeccion) => {
                                          if (inspeccion.imagen)
                                            return Object.keys(
                                              inspeccion.imagen
                                            ).map((imagen, i) => (
                                              <li
                                                key={`${inspeccion.imagen[imagen].ur}-${i}`}
                                                className="ml-2"
                                              >
                                                <a
                                                  href={
                                                    inspeccion.imagen[imagen]
                                                      .url
                                                  }
                                                >
                                                  {" "}
                                                  - {inspeccion.posicion} :{" "}
                                                  <span className="text-blue-600 underline">
                                                    {" "}
                                                    {
                                                      inspeccion.imagen[imagen]
                                                        .observacion
                                                    }
                                                  </span>
                                                </a>
                                              </li>
                                            ));
                                        }
                                      )}
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                        </div>
                        <div className="car detail gap-[4rem] flex flex-col ">
                          {inspeccionWrapper.tires?.map((eje, i) => {
                            if (eje.length === 1)
                              return <SingleTireAxle eje={eje} key={i}/>;
                            if (eje.length === 2)
                              return <DoubleTireAxle eje={eje} key={i} fit={true} presionAxle={inspeccionWrapper.presiones_establecidas[0]}/>;
                            if (eje.length === 4)
                              return <QuadTireAxle eje={eje} key={i} fit={true} presionAxle={inspeccionWrapper.presiones_establecidas[0]}/>;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </section>
        <section className="page">
          <header>
            <h2 className="text-xl mt-10" id="resumen-observaciones">
              Resumen de observaciones
            </h2>
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
        <section className="page max-w-[100%]">
          <article>
            <header>
              <h2 className="text-xl mt-10" id="dimensiones-neumatico">
                Dimensiones de neumáticos
              </h2>
            </header>
            {dimensionesLlantaState === "loading" && <LoadingIndicator />}
            {dimensionesLlantaState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={dimensionesLlanta}
                width="500px"
                height="500px"
                legendToggle
              />
            )}
          </article>
          <article>
            <header>
              <h2 className="text-xl mt-10" id="marca-neumatico">
                {" "}
                Marca de un neumáticos
              </h2>
            </header>
            {marcasLlantaState === "loading" && <LoadingIndicator />}
            {marcasLlantaState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={marcasLlanta}
                width="500px"
                height="500px"
                legendToggle
              />
            )}
          </article>
        </section>
        <section className="page max-w-[100%]">
          <article>
            <header>
              <h2 className="text-xl mt-10" id="vida-neumatico">
                Vida de neumáticos
              </h2>
            </header>
            {vidaLLantaState === "loading" && <LoadingIndicator />}
            {vidaLLantaState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={vidaLLanta}
                width="500px"
                height="500px"
                legendToggle
              />
            )}
          </article>
          <article>
            <header>
              <h2 className="text-xl mt-10" id="analisis-presion">
                Analisis de presión
              </h2>
            </header>
            {analisisPresionState === "loading" && <LoadingIndicator />}
            {analisisPresionState === "loaded" && (
              <Chart
                chartType="PieChart"
                options={{ is3D: true }}
                data={analisisPresion}
                width="500px"
                height="500px"
                legendToggle
              />
            )}
          </article>
        </section>
        <section className="page max-w-[100%]">
          <article>
            <header>
              <h2 className="text-xl mt-10" id="presion-eje">
                Presión por tipo de eje
              </h2>
            </header>
            {presionTipoEjeState === "loading" && <LoadingIndicator />}
            {presionTipoEjeState === "loaded" && (
              <div className="flex flex-wrap">
                <Chart
                  chartType="PieChart"
                  options={{ is3D: true }}
                  data={presionTipoEje?.dirrecion}
                  width="500px"
                  height="400px"
                  legendToggle
                />
                <Chart
                  chartType="PieChart"
                  options={{ is3D: true }}
                  data={presionTipoEje?.traccion}
                  width="500px"
                  height="400px"
                  legendToggle
                />
                <Chart
                  chartType="PieChart"
                  options={{ is3D: true }}
                  data={presionTipoEje?.arrastre}
                  width="500px"
                  height="400px"
                  legendToggle
                />
              </div>
            )}
          </article>
        </section>
        <section className="page max-w-[100%]">
          <article>
            <header>
              <h2 className="text-xl mt-10" id="analisis-profundidad">
                Análisis de profundidad
              </h2>
            </header>
            {analisisProfundidadState === "loading" && <LoadingIndicator />}
            {analisisProfundidadState === "loaded" && (
              <div className="flex justify-center  mb-10 ">
                <Chart
                  chartType="Bar"
                  options={{ is3D: true }}
                  data={analisisProfundidad}
                  width="600px"
                  height="500px"
                  legendToggle
                  className="mt-10 ml-[7%]"
                />
              </div>
            )}
          </article>
        </section>
        <section className="page">
          <header>
            <h2 className="text-2xl mt-10" id="cambios">
              Cambios recomendados
            </h2>
          </header>
          Nota: {perdidaMensual} mm de desgaste mensual
          {cambiosRecomendadosState === "loading" && <LoadingIndicator />}
          {cambiosRecomendadosState === "loaded" && (
            <article className="my-10">
              <div>
                <h3 className="text-xl mt-10">Actuales</h3>
                <div className="section-header">
                  <h3>Direccion</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados?.recomendaciones?.Dirección?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map((defecto) => `${defecto}, `)
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Tracción</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados?.recomendaciones?.Tracción?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map((defecto) => `${defecto}, `)
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Resumen</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th>Eje</th>
                      <th>Dimensión de la Llanta</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados?.resumen?.Dirección &&
                      Object.keys(cambiosRecomendados?.resumen?.Dirección)?.map(
                        (llanta, i) => (
                          <tr key={i}>
                            <th>Dirección</th>
                            <td>{llanta}</td>
                            <td>
                              {cambiosRecomendados?.resumen?.Dirección[llanta]}
                            </td>
                          </tr>
                        )
                      )}
                    {cambiosRecomendados?.resumen?.Tracción &&
                      Object.keys(cambiosRecomendados?.resumen?.Tracción)?.map(
                        (llanta, i) => (
                          <tr key={i}>
                            <th>Tracción</th>
                            <td>{llanta}</td>
                            <td>
                              {cambiosRecomendados?.resumen?.Tracción[llanta]}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </article>
          )}
          {cambiosRecomendados30State === "loading" && <LoadingIndicator />}
          {cambiosRecomendados30State === "loaded" && (
            <article className="my-10">
              <div>
                <h3 className="text-xl mt-10">En 30 días</h3>
                <div className="section-header">
                  <h3>Direccion</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados30?.recomendaciones?.Dirección?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map((defecto) => `${defecto}, `)
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Tracción</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados30?.recomendaciones?.Tracción?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map((defecto) => `${defecto}, `)
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Resumen 30</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th>Eje</th>
                      <th>Dimensión de la Llanta</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados30?.resumen?.Dirección &&
                      Object.keys(
                        cambiosRecomendados30?.resumen?.Dirección
                      )?.map((llanta, i) => (
                        <tr key={i}>
                          <th>Dirección</th>
                          <td>{llanta}</td>
                          <td>
                            {cambiosRecomendados30?.resumen?.Dirección[llanta]}
                          </td>
                        </tr>
                      ))}
                    {cambiosRecomendados30?.resumen?.Tracción &&
                      Object.keys(
                        cambiosRecomendados30?.resumen?.Tracción
                      )?.map((llanta, i) => (
                        <tr key={i}>
                          <th>Tracción</th>
                          <td>{llanta}</td>
                          <td>
                            {cambiosRecomendados30?.resumen?.Tracción[llanta]}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </article>
          )}
          {cambiosRecomendados60State === "loading" && <LoadingIndicator />}
          {cambiosRecomendados60State === "loaded" && (
            <article className="my-10">
              <div>
                <h3 className="text-xl mt-10">En 60 días</h3>
                <div className="section-header">
                  <h3>Arrastre</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados60?.recomendaciones?.Arrastre?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map((defecto) => `${defecto}, `)
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Dirección</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados60?.recomendaciones?.Dirección?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map((defecto) => `${defecto}, `)
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Tracción</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th># De matrícula</th>
                      <th>Económico de la llanta</th>
                      <th>Posición</th>
                      <th>Fabricante</th>
                      <th>Dimensión</th>
                      <th>Dibujo</th>
                      <th>Profundidad de banda de rodadura</th>
                      <th>Vida</th>
                      <th>Defectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados60?.recomendaciones?.Tracción?.map(
                      (cambio) => (
                        <tr key={cambio.economico_de_la_llanta}>
                          <td>{cambio.matricula}</td>
                          <td>{cambio.economico_de_la_llanta}</td>
                          <td>{cambio.posicion}</td>
                          <td>{cambio.fabricante}</td>
                          <td>{cambio.dimension}</td>
                          <td>{cambio.dibujo}</td>
                          <td>{cambio.profundidad}mm</td>
                          <td>{cambio.vida}</td>
                          <td>
                            {cambio.defectos.length > 0
                              ? cambio.defectos.map(
                                  (defecto: string) => `${defecto}, `
                                )
                              : "..."}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div className="section-header">
                  <h3>Resumen 60</h3>
                </div>
                <table className="w-full text-center mt-[-1rem]">
                  <thead>
                    <tr>
                      <th>Eje</th>
                      <th>Dimensión de la Llanta</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambiosRecomendados60?.resumen?.Dirección &&
                      Object.keys(
                        cambiosRecomendados60?.resumen?.Dirección
                      )?.map((llanta, i) => (
                        <tr key={i}>
                          <th>Dirección</th>
                          <td>{llanta}</td>
                          <td>
                            {cambiosRecomendados60?.resumen?.Dirección[llanta]}
                          </td>
                        </tr>
                      ))}
                    {cambiosRecomendados60?.resumen?.Tracción &&
                      Object.keys(
                        cambiosRecomendados60?.resumen?.Tracción
                      )?.map((llanta, i) => (
                        <tr key={i}>
                          <th>Tracción</th>
                          <td>{llanta}</td>
                          <td>
                            {cambiosRecomendados60?.resumen?.Tracción[llanta]}
                          </td>
                        </tr>
                      ))}
                    {cambiosRecomendados60?.resumen?.Arrastre &&
                      Object.keys(
                        cambiosRecomendados60?.resumen?.Arrastre
                      )?.map((llanta, i) => (
                        <tr key={i}>
                          <th>Arrastre</th>
                          <td>{llanta}</td>
                          <td>
                            {cambiosRecomendados60?.resumen?.Arrastre[llanta]}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </article>
          )}
        </section>
        <section className="page">
          <article>
            <header>
              <h2 className="text-xl mt-10" id="observaciones-comunicar">
                Observaciones a comunicar
              </h2>
              {observacionesState === "loading" && <LoadingIndicator />}
              {observacionesState === "loaded" && (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Matrícula del vehículo</th>
                      <th>Posición de la llanta</th>
                      <th>Producto</th>
                      <th>Observaciones</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {observaciones?.map((ob) => (
                      <tr key={ob.id}>
                        <td>{ob.matricula}</td>

                        <td>{ob.posicion}</td>

                        <td>{ob.producto_nombre}</td>
                        <td>
                          {ob.observaciones.map(
                            (obs) => `${obs.observacion}, `
                          )}
                        </td>
                        <td>{ob.observaciones.map((obs) => obs.acciones)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </header>
          </article>
        </section>
      </main>
    </>
  );
};

export default ReporteFIT;
