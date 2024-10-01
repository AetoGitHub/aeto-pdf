import { useEffect, useState } from "react";
import axios from "axios";
import { WorkshopReport } from "../../models/Workshop";
import { getVehicleDiagram } from "../../utils/getVehicleDiagram";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetWorkshopReport =  (id: string | undefined) => {
  const [report, setReport] = useState<WorkshopReport>({} as any);

  const getWorkshopReport = async() => {
    const res = await axios.get(
        `${API_BASE_URL}/api/servicio/retrieve/vehicle/report/${id}/`
      );
      const diagram = getVehicleDiagram(res.data, true)
      setReport(diagram);
      console.log(diagram)
  }
  
    useEffect(() => {
      getWorkshopReport();
    }, []);

    return {
        report, setReport
    }
}

export default useGetWorkshopReport