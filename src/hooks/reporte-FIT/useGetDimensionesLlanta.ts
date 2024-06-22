import { useEffect, useState } from "react";
import axios from "axios";

const useGetDimensionesLlanta =  () => {
  const [results, setResults] = useState<[][]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getDimensionesLlanta = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `https://www.aetoweb.com/api/pdf/dimensiones_llanta/${window.location.search}`
      );
      setResults( [["Dimensiones", "Cantidad"], ...res.data.map(llanta=> [`${llanta.producto__dimension} (${llanta.cantidad})`, llanta.cantidad])]);
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