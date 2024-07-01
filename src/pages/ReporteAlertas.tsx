import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reports/styles.css";
import "../css/reports/alertas.css"

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";
import SingleTireAxle from "../components/axles/SingleTireAxle";
import DoubleTireAxle from "../components/axles/DoubleTireAxle";
import QuadTireAxle from "../components/axles/QuadTireAxle";
import { formatDate } from "../utils/formatDate";

/* hooks */
import useGetAlertas from "../hooks/reporte-alertas/useGetAlertas";

const ReporteFIT = () => {
  const { results, state, localidades } = useGetAlertas();
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte de alertas`,
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
                Informe Alertas
              </h2>

              <h3 className="text-lg text-center">
                <span className="mr-1">
                  Para:
                  {localidades?.map((loc, i) =>
                    localidades?.length === i + 1 ? ` ${loc} ` : `${loc}, `
                  )}
                </span>
              </h3>
            </header>
            <div className="section-header text-lg flex justify-end">
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
              localidades?.map((loc) => (
                <div key={loc}>
                  <div className="mb-4">
                    <div className="text-xl">
                      <h4>{loc}</h4>
                    </div>
                  </div>
                  {results[loc]?.map((inspeccion, i) => (
                    <div
                      key={inspeccion.id}
                      className={`mb-10 ${(i + 1) % 2 === 0 ? "page" : ""}`}
                    >
                      <table className="w-full mb-1 text-center">
                        <thead>
                          <tr>
                            <th>Matrícula</th>
                            <th>Marca del Vehículo</th>
                            <th>Localidad</th>
                            <th>Fecha de inspección</th>
                            <th>Odómetro</th>
                            <th>Inspector</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{inspeccion.matricula}</td>
                            <td>{inspeccion.marca}</td>
                            <td>{inspeccion.nombre_localidad}</td>
                            <td>{formatDate(inspeccion.fecha)}</td>
                            <td>{inspeccion.km}</td>
                            <td>{inspeccion.inspectores}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex flex-col  md:flex-row">
                        <div className="w-[100%] mt-5 md:w-[60%] ">
                          <div className="max-w-[60%] car detail gap-[4rem] flex flex-col">
                            {inspeccion.tires?.map((eje, i) => {
                              if (eje.length === 1)
                                return <SingleTireAxle eje={eje} key={i} />;
                              if (eje.length === 2)
                                return (
                                  <DoubleTireAxle
                                    eje={eje}
                                    key={i}
                                    fit={true}
                                    presionAxle={
                                      inspeccion.presiones_establecidas[0]
                                    }
                                  />
                                );
                              if (eje.length === 4)
                                return (
                                  <QuadTireAxle
                                    eje={eje}
                                    key={i}
                                    fit={true}
                                    presionAxle={
                                      inspeccion.presiones_establecidas[0]
                                    }
                                  />
                                );
                            })}
                          </div>
                        </div>

                        <div className="w-[100%] md:w-[40%] md:mt-[0rem] mt-[3.5rem] ">
                          <table className="w-full text-center">
                            <thead>
                              <tr className="bg-white text-black">
                                <th>Pos</th>
                                <th>Icono</th>
                                <th>Defecto</th>
                                <th>Acción</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {inspeccion.inspecciones?.map((llanta) => {
                                {
                                  return llanta.observaciones?.map((ob) => (
                                    <tr key={ob.id}>
                                      <td>{llanta.posicion}</td>
                                      <td>{ob.icono ?? "---"}</td>
                                      <td>{ob.observacion ?? "---"}</td>
                                      <td>{ob.acciones ?? "---"}</td>
                                      <td>
                                        <div
                                          className={
                                            ob.color === "Rojo"
                                              ? `w-[15px] h-[15px] bg-ye mx-auto bg-red-600 my-[1px] `
                                              : `w-[15px] h-[15px] bg-ye m-auto bg-yellow-300 my-[1px] `
                                          }
                                        ></div>
                                      </td>
                                    </tr>
                                  ));
                                }
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
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

export default ReporteFIT;
