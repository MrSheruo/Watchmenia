import useMoviesGenres from "../hooks/useMoviesGenres";

export const convertGenreIDtoText = (ids: number[]) => {
  const { genres } = useMoviesGenres();
  const movieGenres = ids.map((id) => genres.find((genre) => genre.id === id));
  return movieGenres;
};

export const getFirstFourGenres = (ids: number[]) => {
  const movieGenres = convertGenreIDtoText(ids);
  return movieGenres.slice(0, 4);
};
