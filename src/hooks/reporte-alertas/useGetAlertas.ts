import { useEffect, useState } from "react";
import axios from "axios";
import { getVehicleDiagram } from "../../utils/getVehicleDiagram";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://www.aetoweb.com";

const useGetAlertas = () => {
  const [results, setResults] = useState<any>();
  const [localidades, setLocalidades] = useState<string[]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle"
  );

  const getAlertas = async () => {
    setState("loading");
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/informe_alerta/${window.location.search}`
      );
      setLocalidades(Object.keys(res.data));
      const newData = {}
      Object.keys(res.data)?.map(
        (loc) =>
          (newData[loc] = res.data[loc].map((vehiculo) =>
            getVehicleDiagram({
              ...vehiculo,
              configuracion: {
                configuracion: vehiculo.configuracion,
                llantas: vehiculo.inspecciones,
              },
            })
          ))
      );
      setResults(newData);
      setState("loaded");
    } catch (e) {
      setState("error");
      console.error(e);
    }
  };

  useEffect(() => {
    getAlertas();
  }, []);

  return {
    results,
    setResults,
    state,
    localidades,
  };
};

export default useGetAlertas;
