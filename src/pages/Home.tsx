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
import { ads } from "../data/random";
import ReactPlayer from "react-player";
import { useState } from "react";

export default function Home() {
  const { movies } = useGetMovies({ pageNumber: 1 });
  const { allCategories, setSelectedCategory, selectedCategory } =
    useGetMoviesByCategoryContext();

  const [adPlaying, setAdPlaying] = useState<string | null>(null);

  return (
    <>
      {adPlaying && (
        <div
          onClick={() => setAdPlaying(null)}
          className="fixed inset-0 flex justify-center items-center bg-black/90 z-50 animate-start-video"
        >
          <ReactPlayer
            url={adPlaying}
            playing
            controls
            width={"70%"}
            height={"70%"}
            onEnded={() => setAdPlaying(null)}
          />
        </div>
      )}
      <div className="sticky top-0 bg-white z-10 pb-4">
        <Categories
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <hr />
      <section className="px-5">
        {/* Trending Ads */}
        <h3 className="text-xl font-semibold my-2">Trending Ads</h3>
        <div className="flex justify-center items-center my-8">
          {ads.map((a) => (
            <div
              onClick={() => setAdPlaying(a.youtubeLink)}
              key={a.id}
              className="relative cursor-pointer hover:after:bg-red-500 after:transition-colors after:duration-500 after:ease-in-out after:bg-transparent after:absolute after:blur-3xl after:top-60 after:opacity-40 after:bottom-4 after:right-4 after:left-4"
            >
              <img
                className="rounded-lg"
                width={550}
                src={a.image}
                alt={a.title}
              />
            </div>
            // <ReactPlayer url={a.youtubeLink} playing />
          ))}
        </div>
        {/* Movies in theaters */}
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
        </div>
      </section>
    </>
  );
}
