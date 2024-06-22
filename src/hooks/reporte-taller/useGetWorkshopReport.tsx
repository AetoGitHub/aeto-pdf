import { useEffect, useState } from "react";
import axios from "axios";
import { WorkshopReport } from "../../models/Workshop";
import { getVehicleDiagram } from "../../utils/getVehicleDiagram";

const useGetWorkshopReport =  (id: string | undefined) => {
  const [report, setReport] = useState<WorkshopReport>({});

  const getWorkshopReport = async() => {
    const res = await axios.get(
        `https://www.aetoweb.com/api/servicio/retrieve/vehicle/report/${id}/`
      );
      const diagram = getVehicleDiagram(res.data)
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