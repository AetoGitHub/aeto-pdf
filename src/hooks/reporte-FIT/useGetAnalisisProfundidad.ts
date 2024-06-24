import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetAnalisisProfundidad =  () => {
  const [results, setResults] = useState<[][]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getAnalisisProfundidad = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/analisis_profundidad/${window.location.search}`
      );
      setResults(res.data);
      setResults( [["Rango de profundidades", "Cantidad"], ...res.data.map(llanta=> [`${llanta.rango} (${llanta.cantidad} llantas)`, llanta.cantidad])]);

      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getAnalisisProfundidad();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetAnalisisProfundidad