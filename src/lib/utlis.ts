import { useQuery } from "@tanstack/react-query";
import useMoviesGenres from "../hooks/useMoviesGenres";

// utils.tsx
import { Generes } from "../types";
import { options } from "../config";
import axios from "axios";

export const convertGenreIDtoText = (ids: number[], genres: Generes) => {
  const movieGenres = ids.map((id) => genres.find((genre) => genre.id === id));
  return movieGenres;
};

export const getFirstFourGenres = (ids: number[]) => {
  const { genres } = useMoviesGenres();

  const movieGenres = convertGenreIDtoText(ids, genres);
  return movieGenres.slice(0, 3);
};

export const getMovieTrailer = (movieId: number | string) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie trailer"],
    queryFn: () => axios.get(url, options).then((res) => res.data),
  });
  const trailerKey: string = data?.results.find(
    (t: any) => t.type === "Trailer" && t.site === "YouTube"
  ).key;
  return { trailer: trailerKey, isLoading, isError };
};
