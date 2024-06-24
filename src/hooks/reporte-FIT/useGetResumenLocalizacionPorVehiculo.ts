import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetResumenLocalizacionPorVehiculo =  () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getResumenLocalizacionPorVehiculo = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/localizacion_vehiculo/${window.location.search}`
      );
      setResults(res.data);
      // console.log(res.data, "Resumen localización por Vehiculo")
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getResumenLocalizacionPorVehiculo();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetResumenLocalizacionPorVehiculo