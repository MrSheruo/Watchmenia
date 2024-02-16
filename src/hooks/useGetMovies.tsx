import axios from "axios";
import { useState, useEffect } from "react";
import { options } from "../config";
import { useQuery } from "@tanstack/react-query";
import { useGetMoviesByCategoryContext } from "../contexts/getMoviesByCategory";
import { convertGenreIDtoText } from "../lib/utlis";
import useMoviesGenres from "./useMoviesGenres";
import { Movie } from "../types";
type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export default function useGetMovies({ pageNumber = 1 }) {
  const moviesURL = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNumber}`;
  const { genres } = useMoviesGenres();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", pageNumber],
    queryFn: () => axios.get(moviesURL, options).then((res) => res.data),
  });

  const [movies, setMovies] = useState<Movie[]>([]);

  // create a function to filter movies by category
  const { selectedCategory } = useGetMoviesByCategoryContext();

  useEffect(() => {
    if (data) {
      const allMovies: MoviesResponse = data;
      setMovies(allMovies.results);
    }
  }, [data]);

  if (selectedCategory === "all") {
    //
    return { movies, isLoading, isError };
  } else {
    const filterdMoives = movies.filter((m) => {
      const movieGenres = convertGenreIDtoText(m.genre_ids, genres).find(
        (g: any) => g.name === selectedCategory
      );
      return movieGenres !== undefined;
    });
    return { movies: filterdMoives, isLoading, isError };
  }
}
