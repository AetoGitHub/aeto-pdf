import { useEffect, useState } from "react";
import axios from "axios";

const useGetDimensionesLlanta =  () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getDimensionesLlanta = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/dimensiones_llanta/${window.location.search}`
      );
      setResults(res.data);
      console.log(res.data, "Dimensiones llantas")
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getDimensionesLlanta();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetDimensionesLlanta