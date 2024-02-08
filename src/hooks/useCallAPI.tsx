import { useEffect, useState } from "react";
import { apiToken } from "../config";
import axios from "axios";

export default function useCallAPI(url: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | undefined>();

  const fetchData = async (url: any) => {
    try {
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      };
      const res = await axios.get(url, options);

      const data = await res.data;
      setData(data.results);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      setIsError(error.message);
      setIsLoading(false);
      setData([]);
      return;
    }
  };
  useEffect(() => {
    console.log(fetchData(url));
  }, []);
  return { data, isLoading, isError };
}
