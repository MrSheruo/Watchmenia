import axios from "axios";
import { useState, useEffect } from "react";
import { options } from "../config";
import { Movie } from "../types";

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export default function useMovies() {
  const moviesURL =
    "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | undefined>();

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(moviesURL, options);

      const data: MoviesResponse = await res.data;
      setMovies(data.results);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      setIsError(error.message);
      setIsLoading(false);
      setMovies([]);
      return;
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return { movies, isLoading, isError };
}
