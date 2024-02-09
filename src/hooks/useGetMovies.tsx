import axios from "axios";
import { useState, useEffect } from "react";
import { options } from "../config";
import { Movie } from "../types";
import { useQuery } from "@tanstack/react-query";
type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export default function useGetMovies({ pageNumber = 1 }) {
  const moviesURL = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNumber}`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", pageNumber],
    queryFn: () => axios.get(moviesURL, options).then((res) => res.data),
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    if (data) {
      const allMovies: MoviesResponse = data;
      setMovies(allMovies.results);
    }
  }, [data]);
  return { movies, isLoading, isError };
}
