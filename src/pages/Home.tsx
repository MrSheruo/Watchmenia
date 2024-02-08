import { useState } from "react";
import Moive from "../components/Moive";
import useMovies from "../hooks/useMovies";
import useMoviesGenres from "../hooks/useMoviesGenres";
import Categories from "../components/Categories";

export default function Home() {
  const { movies } = useMovies();
  const { categoriesOfMovies } = useMoviesGenres();
  const allCategories = ["all", ...categoriesOfMovies];
  const [selectedCategory, setSelectedCategory] = useState(allCategories[0]);
  // console.log(selectedCategory);

  // TODO GET MOVIES BY CATEGORY AND GENRE

  return (
    <>
      <div className="sticky top-0 bg-white z-10 pb-4">
        <Categories
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {movies.map((movie) => (
          <Moive key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}
