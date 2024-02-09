import { useEffect, useState } from "react";
import { options } from "../config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Generes } from "../types";

export default function useMoviesGenres() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const [genres, setGenres] = useState<Generes>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: () => axios.get(url, options).then((res) => res.data),
  });

  useEffect(() => {
    if (data) {
      const allGenres: Generes = data.genres;
      setGenres(allGenres);
    }
  }, [data]);

  const categoriesOfMovies = genres.map((genre) => genre.name);

  return { genres, isLoading, isError, categoriesOfMovies };
}
