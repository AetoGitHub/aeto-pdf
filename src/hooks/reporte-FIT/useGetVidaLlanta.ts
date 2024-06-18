import { useEffect, useState } from "react";
import axios from "axios";

const useGetVidaLlanta =  () => {
  const [results, setResults] = useState<[][]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getVidaLlanta = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/vida_llanta/${window.location.search}`
      );
      setResults( [["Dimensiones", "Cantidad"], ...res.data.map(llanta=> [`${llanta.vida_upper} (${llanta.cantidad})`, llanta.cantidad])]);
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getVidaLlanta();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetVidaLlanta