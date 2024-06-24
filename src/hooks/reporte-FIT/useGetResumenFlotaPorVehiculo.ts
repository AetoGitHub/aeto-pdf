import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetResumenFlotaPorVehiculo =  () => {
  const [results, setResults] = useState<Record<string, any>>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")
  const [sucursales, setSucursales] = useState<string[]>([])
  const getResumenFlotaPorVehiculo = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/flota_vehiculo/${window.location.search}`
      );
      setResults(res.data);
      // console.log(res.data, "Resumen flota por Vehiculo")
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