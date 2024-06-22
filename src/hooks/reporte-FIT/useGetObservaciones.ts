import { useEffect, useState } from "react";
import axios from "axios";

const useGetObservaciones =  () => {
  const [results, setResults] = useState<any[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getObservaciones = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `https://www.aetoweb.com/api/pdf/observaciones_comunicar/${window.location.search}`
      );
      setResults(res.data.results);
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getObservaciones();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetObservaciones