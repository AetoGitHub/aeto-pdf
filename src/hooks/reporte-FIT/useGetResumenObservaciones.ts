import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetResumenObservaciones =  () => {
  const [results, setResults] = useState<any[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getResumenObservaciones = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/resumen_observaciones/${window.location.search}`
      );
      setResults(res.data);
      // console.log(res.data, "Resumen Observaciones")
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getResumenObservaciones();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetResumenObservaciones