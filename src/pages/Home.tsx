import Moive from "../components/Moive";
import useGetMovies from "../hooks/useGetMovies";
import Categories from "../components/Categories";
import { useGetMoviesByCategoryContext } from "../contexts/getMoviesByCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/Carousel";

export default function Home() {
  const { movies } = useGetMovies({ pageNumber: 1 });

  const { allCategories, setSelectedCategory, selectedCategory } =
    useGetMoviesByCategoryContext();

  return (
    <>
      <div className="sticky top-0 bg-white z-10 pb-4">
        <Categories
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <hr />
      <section className="px-5">
        <h3 className="text-xl font-semibold my-2">Movies in theaters</h3>
        <div className="flex flex-col gap-8">
          <Carousel>
            <CarouselContent>
              {movies.map((movie) => (
                <CarouselItem
                  className="xl:basis-1/4 lg:basis-1/3 md:basis-1/2 flex justify-center"
                  key={movie.id}
                >
                  <Moive {...movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-secondary-dark hover:text-secondary-dark text-secondary" />
            <CarouselNext className="bg-secondary-dark hover:text-secondary-dark text-secondary" />
          </Carousel>
          <Carousel>
            <CarouselContent>
              {movies.map((movie) => (
                <CarouselItem
                  className="xl:basis-1/4 lg:basis-1/3 md:basis-1/2 flex justify-center"
                  key={movie.id}
                >
                  <Moive {...movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-secondary-dark hover:text-secondary-dark text-secondary" />
            <CarouselNext className="bg-secondary-dark hover:text-secondary-dark text-secondary" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
