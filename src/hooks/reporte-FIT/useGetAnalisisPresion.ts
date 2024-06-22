import { useEffect, useState } from "react";
import axios from "axios";

const useGetAnalisisPresion = () => {
  const [results, setResults] = useState<[string, unknown][]>();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle"
  );

  const getAnalisisPresion = async () => {
    setState("loading");
    try {
      const res = await axios.get(
        `https://www.aetoweb.com/api/pdf/analisis_presion/${window.location.search}`
      );
      setResults([
        ["Estado", "Cantidad"],
        [`Buenas (${res.data["Buenas"]})`, res.data["Buenas"]],
        [`Malas (${res.data["Malas"]})`, res.data["Malas"]],
        [`Sin medir (${res.data["SinMedir"]})`, res.data["SinMedir"]],
      ]);
      setState("loaded");
    } catch (e) {
      setState("error");
      console.error(e);
    }
  };

  useEffect(() => {
    getAnalisisPresion();
  }, []);

  return {
    results,
    setResults,
    state,
  };
};

export default useGetAnalisisPresion;
