import "../css/base.css";
import "../css/normalize.css";
import "../css/style.css";
import "../css/reporteVehiculo.css";
import aetoLogo from "../assets/aeto-logo.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import useGetWorkshopReport from "../hooks/useGetWorkshopReport";
import { TimeDifferenceBetweenDates } from "../utils/TimeDifferenceBetweenDates";

const ReporteTaller = () => {
  const { reportId } = useParams();
  const { report } = useGetWorkshopReport(reportId);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte taller ${report?.numero_economico}`,
  });

  return (
    <>
      <div className="w-full flex justify-end gap-[2rem]">
        <button
          className="bg-black text-white rounded-2xl hover:bg-gray-800 p-3 my-2 "
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          Descargar PDF
        </button>
      </div>
      <div ref={contentToPrint}>
        <header ref={contentToPrint} className="report__head">
          <div className="flex-row space-between">
            <h1 className="report__title">
              Reporte de servicios en taller - {report.numero_economico}
            </h1>
            <div className="logo">
              <img src={aetoLogo} alt="logo aeto reporte" />
            </div>
          </div>
          <nav className="report__details">
            <div className="report__card">
              <div className="report__card-title">Usuario</div>
              <div className="report__card-body">
                {report.usuario__username}
              </div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Folio</div>
              <div className="report__card-body">{report.folio}</div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Marca</div>
              <div className="report__card-body">{report.marca}</div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Modelo</div>
              <div className="report__card-body">{report.modelo}</div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Flota</div>
              <div className="report__card-body">
                {report.aplicacion_nombre}
              </div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Localización</div>
              <div className="report__card-body">{report.ubicacion_nombre}</div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Fecha</div>
              <div className="report__card-body">
                {new Date(report.fecha_inicio).getDate()}/
                {new Date(report.fecha_inicio).getMonth() + 1}/
                {new Date(report.fecha_inicio).getFullYear()}
              </div>
            </div>

            <div className="report__card">
              <div className="report__card-title">Tipo de inspección</div>
              <div className="report__card-body">Servicio</div>
            </div>
            <div className="report__card">
              <div className="report__card-title">Duración</div>
              <div className="report__card-body">
                {TimeDifferenceBetweenDates(
                  report.fecha_inicio,
                  report.fecha_final
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="main__container-config ejes__CANTIDADDEEJESHERE">
          <div className="checks__container justify-center flex mt-3 gap-5">
            {report.inflado && (
              <div className="inflado flex justify-center">
                <CheckCircleOutlineIcon />
                Inflado
              </div>
            )}

            {report.alineacion && (
              <div className="alineado flex justify-center">
                <CheckCircleOutlineIcon />
                Alineado
              </div>
            )}
          </div>

          <div className="config__container">
            <img
              src="https://i.gyazo.com/c6b721b4b2d030f9f803ee4127cbe7de.png"
              alt="CONFIGURACION AQUII"
              className="mt-5"
            />
          </div>
        </main>

        <div className="config__list">
          <div className="list__cont">
            <div className="title-list">
              <h1>Servicios</h1>
            </div>
            <div className="config__container-table">
              <table className="config__table">
                <thead>
                  <tr>
                    <th className="th-table">Pos</th>
                    <th className="th-table">Incidencia</th>
                  </tr>
                </thead>
                <tbody>
                  {report.alineacion && (
                    <tr>
                      <td className="td-table">
                        Vehiculo {report.numero_economico}
                      </td>
                      <td className="td-table">El vehículo se alineó</td>
                    </tr>
                  )}
                  {report.inflado && (
                    <tr>
                      <td className="td-table">
                        Vehiculo {report.numero_economico}
                      </td>
                      <td className="td-table">El vehículo se infló</td>
                    </tr>
                  )}
                  {report.cambio_hubometro && (
                    <tr>
                      <td className="td-table">
                        Vehiculo {report.numero_economico}
                      </td>
                      <td className="td-table">
                        Nuevo kilometraje de hubometro:{" "}
                        {report.km_cambio_hubometro}{" "}
                      </td>
                    </tr>
                  )}
                  {report.service_tires?.map((llanta) => (
                    <Fragment key={`${llanta.id}`}>
                      {llanta.balanceado && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>
                          <td className="td-table">Se balanceó la llanta</td>
                        </tr>
                      )}
                      {llanta.inflado && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>

                          <td className="td-table">Se infló la llanta</td>
                        </tr>
                      )}
                      {llanta.reparado && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>

                          <td className="td-table">Se reparó la llanta</td>
                        </tr>
                      )}
                      {llanta.valvula_reparada && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>

                          <td className="td-table">Se reparó la válvula</td>
                        </tr>
                      )}
                      {llanta.costado_reparado && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>

                          <td className="td-table">
                            Se reparó el costado de la llanta
                          </td>
                        </tr>
                      )}
                      {llanta.girar_llanta && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>

                          <td className="td-table">Se giró la llanta</td>
                        </tr>
                      )}
                      {llanta.marcaje_llanta && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>

                          <td className="td-table">Se marcó la llanta</td>
                        </tr>
                      )}
                      {llanta.rotar && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>
                          <td className="td-table">La llanta de número económico: {llanta.numero_economico} se rotó con la llanta: {llanta.rotar_numero_economico} de la posición: {llanta.rotar_posicion}</td>
                        </tr>
                      )}
                      {llanta.desmontaje && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>
                          <td className="td-table">La llanta {llanta.numero_economico} se desmontó en el almacen {llanta.desmontar_inventario_llanta} y se colocó la llanta {llanta.desmontar_llanta_economico}</td>
                        </tr>
                      )}
                      {llanta.servicio_carretero && (
                        <tr>
                          <td className="td-table">{llanta.posicion}</td>
                          <td className="td-table">Se le realizó un servicio carretero a la llanta {llanta.numero_economico}</td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReporteTaller;
