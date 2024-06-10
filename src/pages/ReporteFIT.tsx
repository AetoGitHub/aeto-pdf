import "../css/base.css";
import "../css/normalize.css";
import "../css/icomoon/style.css";
import "../css/reporteVehiculo.css";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useGetResumenFlotaPorVehiculo from "../hooks/useGetResumenFlotaPorVehiculo";


const ReporteFIT = () => {
//   const { id } = useParams();

  useGetResumenFlotaPorVehiculo()
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `Reporte taller FIT`,
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
          <div>asas</div>
      </div>
    </>
  );
};

export default ReporteFIT;
