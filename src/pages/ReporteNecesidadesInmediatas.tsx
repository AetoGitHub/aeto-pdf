import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reports/styles.css";

import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";

/* hooks */
import useGetNecesidadesInmediatas from "../hooks/reporte-necesidades-inmediatas/useGetNecesidadesInmediatas";

const ReporteFIT = () => {
  const { results, state, localidades } = useGetNecesidadesInmediatas();
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte de necesidades inmediatas`,
  });

  return (
    <>
      <div className="w-full flex justify-end gap-[2rem]">
        <button
          className={`rounded-2xl p-3 my-4 text-xl transition-colors duration-300 ${
            state === "loaded"
              ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
              : "bg-gray-500 text-black cursor-not-allowed opacity-50"
          }`}
          disabled={state !== "loaded"}
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          {state === "loaded" ? "Descargar PDF" : "Cargando PDF..."}
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
          <article>
            <header className="mb-10">
              <h2 className="text-3xl text-center" id="resumen-clase">
                Informe de necesidades inmediatas
              </h2>

              <h3 className="text-lg text-center">
                <span className="mr-1">Para: </span>
                {localidades.map((loc, i) =>
                  localidades.length === i + 1 ? ` ${loc} ` : `${loc}, `
                )}
              </h3>
            </header>
            <div className="section-header text-lg flex justify-between">
              <h4 className="font-bold">
                Localidades:{" "}
                <span>
                  {localidades.map((loc, i) =>
                    localidades.length === i + 1 ? ` ${loc} ` : `${loc}, `
                  )}
                </span>
              </h4>
              <h4 className="font-bold">
                Rango de fechas:{" "}
                <span className="font-light">
                  {startDate?.replace(/-/g, "/")} -{endDate?.replace(/-/g, "/")}
                </span>
              </h4>
            </div>

            {state === "loading" && <LoadingIndicator />}

            {state === "loaded" &&
              results &&
              localidades.map((loc) => (
                <div key={loc} className="mb-4">
                  <div className="text-xl">
                    <h4>{loc}</h4>
                  </div>
                  {Object.keys(results[loc]).length > 0 && (
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Vehículo</th>
                          <th>Posición</th>
                          <th>Dimensión</th>
                          <th>Observaciones</th>
                          <th>Acciones</th>
                          <th>Profundidad del dibujo</th>
                          <th>Presión</th>
                          <th>Presión Objetivo</th>
                          <th>Fech/hora de inspeccion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results &&
                          Object.keys(results[loc]).map((vehiculo) => (
                            <React.Fragment key={vehiculo}>
                              <tr className="h-[1px] " key={vehiculo}></tr>
                              {results[loc][vehiculo].map(
                                (necesidad, i: number) => (
                                  <tr
                                    key={`${loc}-${vehiculo}-${necesidad.numero_economico}-${necesidad.fecha_inspeccion}-${i}`}
                                  >
                                    <td>{necesidad.numero_economico}</td>
                                    <td>{necesidad.punto_venta}</td>
                                    <td>{necesidad.dimension}</td>
                                    <td>{necesidad.observaciones}</td>
                                    <td
                                      className={
                                        necesidad.acciones === null
                                          ? "text-center"
                                          : ""
                                      }
                                    >
                                      {necesidad.acciones ?? "---"}
                                    </td>
                                    <td>{necesidad.profundidad_dibujo}</td>
                                    <td>{necesidad.presion}</td>
                                    <td>{necesidad.presion_objetivo}</td>
                                    <td>{necesidad.fecha_inspeccion}</td>
                                  </tr>
                                )
                              )}
                            </React.Fragment>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
          </article>
        </section>
      </main>
    </>
  );
};

export default ReporteFIT;
