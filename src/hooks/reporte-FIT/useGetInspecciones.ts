import { useEffect, useState } from "react";
import axios from "axios";
import { getVehicleDiagram } from "../../utils/getVehicleDiagram";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetInspecciones =  () => {
  const [results, setResults] = useState<any[]>([]);

  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getInspecciones = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/inspecciones_vehiculo/${window.location.search}`
      );
      const inspeccionesWithDiagrams = res.data.map((vehiculo)=> {
        return getVehicleDiagram({
          ...vehiculo,
          configuracion: {
            configuracion: vehiculo.configuracion,
            llantas: vehiculo.inspecciones
          }
        })
      })
      setResults(inspeccionesWithDiagrams);
      console.log(inspeccionesWithDiagrams)
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
        getInspecciones();
    }, []);

    return {
      results, setResults, state
    }
}

export default useGetInspecciones