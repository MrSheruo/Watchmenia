import useMoviesGenres from "../hooks/useMoviesGenres";

// utils.tsx
import { Generes } from "../types";

export const convertGenreIDtoText = (ids: number[], genres: Generes) => {
  const movieGenres = ids.map((id) => genres.find((genre) => genre.id === id));
  return movieGenres;
};

export const getFirstFourGenres = (ids: number[]) => {
  const { genres } = useMoviesGenres();

  const movieGenres = convertGenreIDtoText(ids, genres);
  return movieGenres.slice(0, 3);
};
