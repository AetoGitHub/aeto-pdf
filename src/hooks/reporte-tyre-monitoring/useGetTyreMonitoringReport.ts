import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.aetoweb.com';

const useGetTyreMonitoringReport =  () => {
  const [results, setResults] = useState<any>();
  const [localidades, setLocalidades] = useState<string[]>([]);

  const [state, setState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  const getTyreMonitoringReport = async() => {
    setState("loading")
    try{
      const res = await axios.get(
        `${API_BASE_URL}/api/pdf/tyre_monitoring/${window.location.search}`
      );
      setResults(res.data);
      setLocalidades(Object.keys(res.data))
      console.log(res.data)
      setState("loaded")
    } catch (e){
      setState("error")
      console.error(e)
    }
  }

    useEffect(() => {
      getTyreMonitoringReport();
    }, []);

    return {
      results, setResults, state, localidades
    }
}

export default useGetTyreMonitoringReport