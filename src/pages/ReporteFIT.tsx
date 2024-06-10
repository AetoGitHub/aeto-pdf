import "../css/base.css";
import "../css/normalize.css";
import "../css/style.css";
import "../css/reporteVehiculo.css";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


const ReporteFIT = () => {
//   const { id } = useParams();

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
          
      </div>
    </>
  );
};

export default ReporteFIT;
