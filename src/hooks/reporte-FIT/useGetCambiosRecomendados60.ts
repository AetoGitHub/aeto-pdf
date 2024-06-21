import { useEffect, useState } from "react";
import axios from "axios";

const useGetCambiosRecomendados60 =  () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getCambiosRecomendados60 = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/cambios_recomendados/60/${window.location.search}`
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