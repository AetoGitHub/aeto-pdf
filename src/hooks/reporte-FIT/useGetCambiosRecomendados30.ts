import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetCambiosRecomendados30 =  () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getCambiosRecomendados30 = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/cambios_recomendados/30/${window.location.search}`
      );

      setResults(res.data);

      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getCambiosRecomendados30();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetCambiosRecomendados30