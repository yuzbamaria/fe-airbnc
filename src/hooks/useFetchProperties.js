import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchProperties(searchParams) {
  const [propertiesList, setPropertiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://be-airbnc-zw86.onrender.com/api/properties", {
        params: Object.fromEntries(searchParams.entries()),
      })
      .then((response) => {
        setPropertiesList(response.data.properties);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // always executed
      });
  }, [searchParams]);

  return { propertiesList, isLoading };
}
