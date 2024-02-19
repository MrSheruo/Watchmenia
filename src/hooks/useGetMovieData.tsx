import axios from "axios";
import { options } from "../config";
import { useQuery } from "@tanstack/react-query";
import { getMovieTrailer } from "../lib/utlis";
import { Movie } from "../types";
type useGetMovieDataProps = {
  movieId: number | string;
};
export default function useGetMovieData({ movieId }: useGetMovieDataProps) {
  const { trailer } = getMovieTrailer(movieId);
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie"],
    queryFn: () =>
      axios.get(url, options).then((res: { data: Movie }) => res.data),
  });

  //   console.log({ data, isLoading, isError });

  const movie = {
    movieData: data,
    movieTrailer: `https://www.youtube.com/watch?v=${trailer}`,
  };
  return { movie, isLoading, isError };
}
