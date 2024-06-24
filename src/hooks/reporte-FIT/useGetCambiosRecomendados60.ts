import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetCambiosRecomendados60 =  () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getCambiosRecomendados60 = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/cambios_recomendados/60/${window.location.search}`
      );

      setResults(res.data);

      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getCambiosRecomendados60();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetCambiosRecomendados60