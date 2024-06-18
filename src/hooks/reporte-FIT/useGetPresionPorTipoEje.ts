import { useEffect, useState } from "react";
import axios from "axios";

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
        `http://127.0.0.1:8000/api/pdf/presion_tipo_eje/${window.location.search}`
      );

      const chartProps = {
        arrastre: [
          ["Presion", "Cantidad"],
          [
            `Buenas (${res.data["Arrastre"].Buenas})`,
            res.data["Arrastre"].Buenas,
          ],
          [`Malas (${res.data["Arrastre"].Malas})`, res.data["Arrastre"].Malas],
          [`Total (${res.data["Arrastre"].Total})`, 0],
        ],
        dirrecion: [
          ["Presion", "Cantidad"],
          [
            `Buenas (${res.data["Dirección"].Buenas})`,
            res.data["Dirección"].Buenas,
          ],
          [
            `Malas (${res.data["Dirección"].Malas})`,
            res.data["Dirección"].Malas,
          ],
          [
            `Total (${res.data["Dirección"].Total})`,
            0,
          ],
        ],
        traccion: [
          ["Presion", "Cantidad"],
          [
            `Buenas (${res.data["Tracción"].Buenas})`,
            res.data["Tracción"].Buenas,
          ],
          [`Malas (${res.data["Tracción"].Malas})`, res.data["Tracción"].Malas],
          [`Total (${res.data["Tracción"].Total})`, 0],
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
