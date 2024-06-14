import { useEffect, useState } from "react";
import axios from "axios";

const useGetResumenObservaciones =  () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getResumenObservaciones = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/resumen_observaciones/${window.location.search}`
      );
      setResults(res.data);
      console.log(res.data, "Resumen Observaciones")
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