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
        `http://127.0.0.1:8000/api/pdf/analisis_presion/${window.location.search}`
      );
      setResults([
        ["Estado", "Cantidad"],
        [`Buenas (${res.data["Buenas"]})`, res.data["Buenas"]],
        [`Malas (${res.data["Malas"]})`, res.data["Malas"]],
        [`Total (${res.data["Total"]})`, 0],
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
