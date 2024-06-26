import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetNecesidadesInmediatas =  () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [localidades, setLocalidades] = useState<string[]>([]);

  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getNecesidadesInmediatas = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/informe_necedidades/${window.location.search}`
      );
      setResults(res.data);
      setLocalidades(Object.keys(res.data))
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getNecesidadesInmediatas();
    }, []);

    return {
      results, setResults, state, localidades
    }
}

export default useGetNecesidadesInmediatas