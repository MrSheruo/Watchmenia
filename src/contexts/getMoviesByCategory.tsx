import { createContext, useContext, useState } from "react";
import useMoviesGenres from "../hooks/useMoviesGenres";



type getMoviesByCategoryContextProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  allCategories: string[];
};
const getMoviesByCategoryContext =
  createContext<getMoviesByCategoryContextProps | null>(null);

export function useGetMoviesByCategoryContext() {
  const value = useContext(getMoviesByCategoryContext);
  if (value == null)
    throw Error(
      "useGetMoviesByCategoryContext must be used inside a getMoviesByCategoryContextProvider"
    );

  return value;
}

type getMoviesByCategoryProps = {
  children: React.ReactNode;
};

//
export default function GetMoviesByCategory({
  children,
}: getMoviesByCategoryProps) {
  const { categoriesOfMovies, isError } = useMoviesGenres();
  if (isError) return null;
  const allCategories = ["all", ...categoriesOfMovies];
  const [selectedCategory, setSelectedCategory] = useState(allCategories[0]);

  return (
    <getMoviesByCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory, allCategories }}
    >
      {children}
    </getMoviesByCategoryContext.Provider>
  );
}
