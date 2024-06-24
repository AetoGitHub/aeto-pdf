import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetPresionPorTipoEje = () => {
  const [results, setResults] = useState<{
    arrastre: unknown[][];
    dirrecion: unknown[][];
    traccion: unknown[][];
  }>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle"
  );

  const getPresionPorTipoEje = async () => {
    setState("loading");
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/presion_tipo_eje/${window.location.search}`
      );
      const chartProps = {
        arrastre: [
          ["Presion", "Cantidad"],
          [`Buenas (${res.data["Arrastre"].Buenas})`,res.data["Arrastre"].Buenas],
          [`Malas (${res.data["Arrastre"].Malas})`, res.data["Arrastre"].Malas],
          [`Sin medir (${res.data["Arrastre"].SinMedir})`,  res.data["Arrastre"].SinMedir],
        ],
        dirrecion: [
          ["Presion", "Cantidad"],
          [`Buenas (${res.data["Dirección"].Buenas})`,res.data["Dirección"].Buenas],
          [`Malas (${res.data["Dirección"].Malas})`, res.data["Dirección"].Malas],
          [`Sin medir (${res.data["Dirección"].SinMedir})`,  res.data["Dirección"].SinMedir],
        ],
        traccion: [
          ["Presion", "Cantidad"],
          [`Buenas (${res.data["Tracción"].Buenas})`,res.data["Tracción"].Buenas],
          [`Malas (${res.data["Tracción"].Malas})`, res.data["Tracción"].Malas],
          [`Sin medir (${res.data["Tracción"].SinMedir})`, res.data["Tracción"].SinMedir],
        ],
      };
      setResults(chartProps);
      setState("loaded");
    } catch (e) {
      setState("error");
      console.error(e);
    }
  };

  useEffect(() => {
    getPresionPorTipoEje();
  }, []);

  return {
    results,
    setResults,
    state,
  };
};

export default useGetPresionPorTipoEje;
