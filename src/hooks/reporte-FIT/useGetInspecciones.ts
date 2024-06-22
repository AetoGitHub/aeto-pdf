import { useEffect, useState } from "react";
import axios from "axios";
import { getVehicleDiagram } from "../../utils/getVehicleDiagram";

const useGetInspecciones =  () => {
  const [results, setResults] = useState();

  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getInspecciones = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `https://www.aetoweb.com/api/pdf/inspecciones_vehiculo/${window.location.search}`
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