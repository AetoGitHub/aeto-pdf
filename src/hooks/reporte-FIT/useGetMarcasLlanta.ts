import { useEffect, useState } from "react";
import axios from "axios";

const useGetMarcasLlanta =  () => {
  const [results, setResults] = useState<[][]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getMarcasLlanta = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `https://www.aetoweb.com/api/pdf/marca_llanta/${window.location.search}`
      );
      setResults( [["Marca", "Cantidad"], ...res.data.map(llanta=> [`${llanta.producto__marca} (${llanta.cantidad})`, llanta.cantidad])]);
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
      getMarcasLlanta();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetMarcasLlanta