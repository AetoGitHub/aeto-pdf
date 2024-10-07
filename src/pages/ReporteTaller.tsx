import '../css/base.css';
import '../css/normalize.css';
import '../css/icomoon/style.css';
import '../css/reporteVehiculo.css';
import aetoLogo from '../assets/aeto-logo.svg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import useGetWorkshopReport from '../hooks/reporte-taller/useGetWorkshopReport';
import { TimeDifferenceBetweenDates } from '../utils/TimeDifferenceBetweenDates';
import SingleTireAxle from '../components/workshop/axles/SingleTireAxle';
import DoubleTireAxle from '../components/workshop/axles/DoubleTireAxle';
import QuadTireAxle from '../components/workshop/axles/QuadTireAxle';

const ReporteTaller = () => {
  const { reportId } = useParams();
  const { report } = useGetWorkshopReport(reportId);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte taller ${report?.numero_economico}`,
  });

  return (
    <>
      <div className='w-full flex justify-end gap-[2rem]'>
        <button
          className='bg-black text-white rounded-2xl hover:bg-gray-800 p-3 my-2 '
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          Descargar PDF
        </button>
      </div>
      <div ref={contentToPrint}>
        <header ref={contentToPrint} className='report__head mb-10'>
          <div className='flex-row space-between'>
            <h1 className='report__title'>
              Reporte de servicios en taller - {report.numero_economico}
            </h1>
            <div className='logo-a'>
              <img src={aetoLogo} alt='logo aeto reporte' />
            </div>
          </div>
          <nav className='report__details'>
            <div className='report__card'>
              <div className='report__card-title'>Usuario</div>
              <div className='report__card-body'>
                {report.usuario__username}
              </div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Folio</div>
              <div className='report__card-body'>{report.folio}</div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Marca</div>
              <div className='report__card-body'>{report.marca}</div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Modelo</div>
              <div className='report__card-body'>{report.modelo}</div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Flota</div>
              <div className='report__card-body'>
                {report.aplicacion_nombre}
              </div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Localización</div>
              <div className='report__card-body'>{report.ubicacion_nombre}</div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Fecha</div>
              <div className='report__card-body'>
                {new Date(report.fecha_inicio).getDate()}/
                {new Date(report.fecha_inicio).getMonth() + 1}/
                {new Date(report.fecha_inicio).getFullYear()}
              </div>
            </div>

            <div className='report__card'>
              <div className='report__card-title'>Tipo de inspección</div>
              <div className='report__card-body'>Servicio</div>
            </div>
            <div className='report__card'>
              <div className='report__card-title'>Duración</div>
              <div className='report__card-body'>
                {TimeDifferenceBetweenDates(
                  report.fecha_inicio,
                  report.fecha_final
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className='main__container-config'>
          <div className='checks__container justify-center flex mt-3 mb-10 gap-5'>
            {report.inflado && (
              <div className='inflado flex justify-center gap-1'>
                <CheckCircleOutlineIcon />
                Inflado
              </div>
            )}
            {report.alineacion && (
              <div className='alineado flex justify-center gap-1'>
                <CheckCircleOutlineIcon />
                Alineado
              </div>
            )}
            {report.correccion_km && (
              <div className='flex justify-center gap-1'>
                <CheckCircleOutlineIcon />
                Correción de km
              </div>
            )}{' '}
            {report.reparacion_de_autoinflado && (
              <div className='flex justify-center gap-1'>
                <CheckCircleOutlineIcon />
                Autoinflado
              </div>
            )}{' '}
            {report.repacion_rodamiento && (
              <div className='flex justify-center gap-1'>
                <CheckCircleOutlineIcon />
                Reparacion de rodamiento
              </div>
            )}{' '}
            {report.reparacion_vehiculo && (
              <div className='flex justify-center gap-1'>
                <CheckCircleOutlineIcon />
                Reparacion de vehículo
              </div>
            )}
          </div>

          <div className='config__container'>
            {report.tires?.map((eje, i) => {
              if (eje.length === 1) return <SingleTireAxle eje={eje} key={i} />;
              if (eje.length === 2) return <DoubleTireAxle eje={eje} key={i} />;
              if (eje.length === 4) return <QuadTireAxle eje={eje} key={i} />;
            })}
          </div>
        </main>

        <div className='config__list'>
          <div className='list__cont'>
            <div className='title-list'>
              <h1>Servicios</h1>
            </div>
            <div className='config__container-table'>
              <table className='config__table'>
                <thead>
                  <tr>
                    <th className='th-table'>Pos</th>
                    <th className='th-table'>Incidencia</th>
                  </tr>
                </thead>
                <tbody>
                  {report.alineacion && (
                    <tr>
                      <td className='td-table'>
                        Vehiculo {report.numero_economico}
                      </td>
                      <td className='td-table'>El vehículo se alineó</td>
                    </tr>
                  )}

                  {report.alineacion &&
                    report.inch_ejes.ejes[1] &&
                    report.inch_ejes.ejes[1]?.before !== '' && (
                      <tr>
                        <td className='td-table'>Eje N° 1</td>
                        <td className='td-table'>
                          Medida previa a la alineación:{' '}
                          {report.inch_ejes.ejes[1]?.before}, Medida luego de la
                          alineación: {report.inch_ejes.ejes[1]?.after}
                        </td>
                      </tr>
                    )}
                  {report.alineacion &&
                    report.inch_ejes.ejes[2] &&
                    report.inch_ejes.ejes[2]?.before !== '' && (
                      <tr>
                        <td className='td-table'>Eje N° 2</td>
                        <td className='td-table'>
                          Medida previa a la alineación:{' '}
                          {report.inch_ejes.ejes[2]?.before}, Medida luego de la
                          alineación: {report.inch_ejes.ejes[2]?.after}
                        </td>
                      </tr>
                    )}
                  {report.alineacion &&
                    report.inch_ejes.ejes[3] &&
                    report.inch_ejes.ejes[3]?.before !== '' && (
                      <tr>
                        <td className='td-table'>Eje N° 3</td>
                        <td className='td-table'>
                          Medida previa a la alineación:{' '}
                          {report.inch_ejes.ejes[3]?.before}, Medida luego de la
                          alineación: {report.inch_ejes.ejes[3]?.after}
                        </td>
                      </tr>
                    )}
                  {report.alineacion &&
                    report.inch_ejes.ejes[4] &&
                    report.inch_ejes.ejes[4]?.before !== '' && (
                      <tr>
                        <td className='td-table'>Eje N° 4</td>
                        <td className='td-table'>
                          Medida previa a la alineación:{' '}
                          {report.inch_ejes.ejes[4]?.before}, Medida luego de la
                          alineación: {report.inch_ejes.ejes[4]?.after}
                        </td>
                      </tr>
                    )}
                  {report.service_tires?.map(
                    (llanta, i) =>
                      i % 2 == 0 && (
                        <Fragment key={`${llanta.id}`}>
                          {llanta.balanceado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se balanceó la llanta
                              </td>
                            </tr>
                          )}
                          {llanta.inflado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se infló la llanta
                                {llanta.presion_entrada !== 9260 &&
                                llanta.presion_entrada !== llanta.presion_salida
                                  ? `, presión de entrada: ${llanta.presion_entrada}PSI, presión de salida ${llanta.presion_salida}PSI`
                                  : ''}
                              </td>
                            </tr>
                          )}
                          {llanta.reparado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se reparó la llanta</td>
                            </tr>
                          )}
                          {llanta.valvula_reparada && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se reparó la válvula</td>
                            </tr>
                          )}
                          {llanta.costado_reparado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se reparó el costado de la llanta
                              </td>
                            </tr>
                          )}
                          {llanta.girar_llanta && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se giró la llanta</td>
                            </tr>
                          )}
                          {llanta.marcaje_llanta && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se marcó la llanta</td>
                            </tr>
                          )}
                          {llanta.rotar && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                La llanta de número económico:{' '}
                                {llanta.numero_economico} se rotó con la llanta:{' '}
                                {llanta.rotar_numero_economico}
                              </td>
                            </tr>
                          )}
                          {llanta.desmontaje && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                La llanta {llanta.numero_economico} se desmontó
                                en el almacen{' '}
                                {llanta.desmontar_inventario_llanta} y se colocó
                                la llanta {llanta.desmontar_llanta_economico}
                              </td>
                            </tr>
                          )}
                          {llanta.servicio_carretero && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se le realizó un servicio carretero a la llanta{' '}
                                {llanta.numero_economico}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                  )}
                </tbody>
              </table>
              <table className='config__table'>
                <thead>
                  <tr>
                    <th className='th-table'>Pos</th>
                    <th className='th-table'>Incidencia</th>
                  </tr>
                </thead>
                <tbody>
                  {report.cambio_hubometro && (
                    <tr>
                      <td className='td-table'>
                        Vehiculo {report.numero_economico}
                      </td>
                      <td className='td-table'>
                        Nuevo kilometraje de hubometro:{' '}
                        {report.km_cambio_hubometro}{' '}
                      </td>
                    </tr>
                  )}
                  {report.service_tires?.map(
                    (llanta, i) =>
                      i % 2 !== 0 && (
                        <Fragment key={`${llanta.id}`}>
                          {llanta.balanceado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se balanceó la llanta
                              </td>
                            </tr>
                          )}
                          {llanta.inflado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se infló la llanta
                                {llanta.presion_entrada !== 9260 &&
                                llanta.presion_entrada !== llanta.presion_salida
                                  ? `, presión de entrada: ${llanta.presion_entrada}PSI, presión de salida ${llanta.presion_salida}PSI`
                                  : ''}
                              </td>
                            </tr>
                          )}
                          {llanta.reparado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se reparó la llanta</td>
                            </tr>
                          )}
                          {llanta.valvula_reparada && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se reparó la válvula</td>
                            </tr>
                          )}
                          {llanta.costado_reparado && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se reparó el costado de la llanta
                              </td>
                            </tr>
                          )}
                          {llanta.girar_llanta && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se giró la llanta</td>
                            </tr>
                          )}
                          {llanta.marcaje_llanta && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>Se marcó la llanta</td>
                            </tr>
                          )}
                          {llanta.rotar && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                La llanta de número económico:{' '}
                                {llanta.numero_economico} se rotó con la llanta:{' '}
                                {llanta.rotar_numero_economico}
                              </td>
                            </tr>
                          )}
                          {llanta.desmontaje && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                La llanta {llanta.numero_economico} se desmontó
                                en el almacen{' '}
                                {llanta.desmontar_inventario_llanta} y se colocó
                                la llanta {llanta.desmontar_llanta_economico}
                              </td>
                            </tr>
                          )}
                          {llanta.servicio_carretero && (
                            <tr>
                              <td className='td-table'>{llanta.posicion}</td>
                              <td className='td-table'>
                                Se le realizó un servicio carretero a la llanta{' '}
                                {llanta.numero_economico}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                  )}
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
