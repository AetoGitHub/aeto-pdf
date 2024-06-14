import { useEffect, useState } from "react";
import axios from "axios";

const useGetResumenFlotaPorVehiculo =  () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")
  const [sucursales, setSucursales] = useState<string[]>([])
  const getResumenFlotaPorVehiculo = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/flota_vehiculo/${window.location.search}`
      );
      setResults(res.data);
      console.log(res.data, "Resumen flota por Vehiculo")
      setSucursales(Object.keys(res.data))
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
      getResumenFlotaPorVehiculo();
    }, []);

    return {
      results, setResults, state, sucursales
    }
}

export default useGetResumenFlotaPorVehiculo