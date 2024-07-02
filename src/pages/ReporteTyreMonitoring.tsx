import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reports/styles.css";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";

/* hooks */
import useGetTyreMonitoringReport from "../hooks/reporte-tyre-monitoring/useGetTyreMonitoringReport";
import { formatDate } from "../utils/formatDate";

const ReporteTyreMonitoring = () => {
  const { results, state, localidades } = useGetTyreMonitoringReport();
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const shouldHavePageClass = (vehicleIndex: number) => {
    if (vehicleIndex === 3) return true;
    if (vehicleIndex > 3 && (vehicleIndex - 3) % 4 === 0) return true;
    return false;
  };

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Tyre Monitoring Report`,
  });

  return (
    <>
      <div className="w-full flex justify-end gap-[2rem]">
        <button
          className={`rounded-2xl p-3 my-4 text-xl transition-colors duration-300 ${
            state === "loaded"
              ? "bg-black text-white hover:bg-gray-800 cursor-pointer fixed top-0 z-50"
              : "bg-gray-500 text-black cursor-not-allowed opacity-50 fixed top-0 z-50"
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
                Tyre Monitoring Report
              </h2>

              <h3 className="text-lg text-center">
                <span className="mr-1">Para: </span>
                {localidades?.map((loc, i) =>
                  localidades.length === i + 1 ? ` ${loc} ` : `${loc}, `
                )}
              </h3>
            </header>
            <div className="section-header text-lg flex justify-between">
              <h4 className="font-bold">
                Localidades:{" "}
                <span>
                  {localidades?.map((loc, i) =>
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
              localidades?.map((loc, i) => (
                <div key={`${i}-${loc}`} className="mb-4">
                  <div className="text-xl">
                    <h2>
                      {results[loc].length == 0
                        ? `${loc}: Sin información... `
                        : loc}
                    </h2>
                  </div>
                  {results[loc]?.map((vehiculo, i) => (
                    <div
                      key={vehiculo.id}
                      className={shouldHavePageClass(i + 1) ? "page" : ""}
                    >
                      <div className="flex justify-between">
                        <span>Matricula: {vehiculo.matricula}</span>
                        <span>Marca/Modelo: {vehiculo.marca}/{vehiculo.modelo}</span>

                        <span>
                          Última Inspección: {formatDate(vehiculo.fecha)}
                        </span>
                      </div>
                      <table className="w-full mb-[3rem] text-center">
                        <thead>
                          <tr>
                            <th>Marca</th>
                            <th>Dimensión</th>
                            <th>Escultura</th>
                            <th>Posición</th>
                            <th>Profundidad original</th>
                            <th>Profundidad</th>
                            <th>Km montado</th>
                            <th>Km actuales</th>
                            <th>Km recorrido</th>
                            <th>Km previsto</th>
                            <th>% desgaste ITD</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehiculo?.inspecciones?.map((llanta) => (
                            <tr key={llanta.id}>
                              <td>{llanta.marca}</td>
                              <td>{llanta.dimension}</td>
                              <td>{llanta.escultura}</td>
                              <td>{llanta.posicion}</td>
                              <td>{llanta.profundidad_original}</td>
                              <td>{llanta.profundidad}</td>
                              <td>{llanta.km_montado ?? "---"}</td>
                              <td>{llanta.km_actual ?? "---"}</td>
                              <td>{llanta.km_recorrido ?? "---"}</td>
                              <td>{llanta.km_previsto ?? "---"}</td>
                              <td>{llanta.porcentaje_desgaste ?? "---"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
          </article>
        </section>
      </main>
    </>
  );
};

export default ReporteTyreMonitoring;
