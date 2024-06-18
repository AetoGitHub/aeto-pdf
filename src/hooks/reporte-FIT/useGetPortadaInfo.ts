import { useEffect, useState } from "react";
import axios from "axios";

const useGetPortadaInfo = () => {
  const [results, setResults] = useState();
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle"
  );

  const getPortadaInfo = async () => {
    setState("loading");
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/pdf/portada/${window.location.search}`
      );
      
      setResults(res.data);
      setState("loaded");
    } catch (e) {
      setState("error");
      console.error(e);
    }
  };

  useEffect(() => {
    getPortadaInfo();
  }, []);

  return {
    results,
    setResults,
    state,
  };
};

export default useGetPortadaInfo;
