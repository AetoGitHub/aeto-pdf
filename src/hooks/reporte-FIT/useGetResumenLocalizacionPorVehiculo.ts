import { useEffect, useState } from "react";
import axios from "axios";

const useGetResumenLocalizacionPorVehiculo =  () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getResumenLocalizacionPorVehiculo = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `https://www.aetoweb.com/api/pdf/localizacion_vehiculo/${window.location.search}`
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