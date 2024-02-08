import { useEffect, useState } from "react";
import { options } from "../config";

import axios from "axios";
import { Generes } from "../types";

export default function useMoviesGenres() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const [allGenres, setAllGenres] = useState<Generes>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | undefined>();

  const getGenres = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(url, options);
      const { genres }: { genres: Generes } = await res.data;
      setAllGenres(genres);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      setIsError(error.message);
      setIsLoading(false);
      setAllGenres([]);
      return;
    }
  };
  useEffect(() => {
    getGenres();
  }, []);

  const categoriesOfMovies = allGenres.map((genre) => genre.name);
  return { allGenres, isLoading, isError, categoriesOfMovies };
}
