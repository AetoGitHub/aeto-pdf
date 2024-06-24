import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetMarcasLlanta =  () => {
  const [results, setResults] = useState<[][]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getMarcasLlanta = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/marca_llanta/${window.location.search}`
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