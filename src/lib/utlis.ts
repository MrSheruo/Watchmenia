import useMoviesGenres from "../hooks/useMoviesGenres";

export const convertGenreIDtoText = (ids: number[]) => {
  const { allGenres } = useMoviesGenres();
  const movieGenres = ids.map((id) =>
    allGenres.find((genre) => genre.id === id)
  );

  return movieGenres;
};
