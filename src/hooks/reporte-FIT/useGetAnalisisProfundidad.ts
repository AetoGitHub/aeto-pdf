import { useEffect, useState } from "react";
import axios from "axios";

const useGetAnalisisProfundidad =  () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getAnalisisProfundidad = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/analisis_profundidad/${window.location.search}`
      );
      setResults(res.data);
      console.log(res.data, "Análisis de profundidad")
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