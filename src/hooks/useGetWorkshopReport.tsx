import { useEffect, useState } from "react";
import axios from "axios";
import { WorkshopReport } from "../models/Workshop";

const useGetWorkshopReport =  (id: string | undefined) => {
  const [report, setReport] = useState<WorkshopReport>({});

  const getWorkshopReport = async() => {
    const res = await axios.get(
        `http://127.0.0.1:8000/api/servicio/retrieve/vehicle/report/${id}/`
      );
      console.log(res.data);
      setReport(res.data);
  }
  
    useEffect(() => {
      getWorkshopReport();
    }, []);

    return {
        report, setReport
    }
}

export default useGetWorkshopReport