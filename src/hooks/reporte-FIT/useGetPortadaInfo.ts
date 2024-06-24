import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetPortadaInfo = () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle"
  );

  const getPortadaInfo = async () => {
    setState("loading");
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/portada/${window.location.search}`
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
