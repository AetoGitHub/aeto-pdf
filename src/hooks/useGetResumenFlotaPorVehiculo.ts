import { useEffect, useState } from "react";
import axios from "axios";

const useGetResumenFlotaPorVehiculo =  () => {
  const [resumen, setResumen] = useState();

  const getResumenFlotaPorVehiculo = async() => {
    const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/flota_vehiculo/?start_date=2024-05-05 00:00:00&end_date=2024-06-06 23:59:59&compania=19&ubicaciones=7878,7959,7957&aplicaciones=23241,23384,23242`
      );
      setResumen(res.data);
      console.log(res.data)
  }
  
    useEffect(() => {
      getResumenFlotaPorVehiculo();
    }, []);

    return {
      resumen, setResumen
    }
}

export default useGetResumenFlotaPorVehiculo