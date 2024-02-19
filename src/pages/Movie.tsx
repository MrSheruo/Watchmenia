import { useParams } from "react-router-dom";
import useGetMovieData from "../hooks/useGetMovieData";
import ReactPlayer from "react-player";
import { baseImgURLFull } from "../config";
import Button from "../components/Button";
import { PlayCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
export default function Movie() {
  const { movieId } = useParams();
  if (movieId === undefined) {
    return;
  }
  const { movie } = useGetMovieData({ movieId });
  const [playMovieTrailer, setPlayMovieTrailer] = useState<string | null>(null);
  return (
    <>
      {playMovieTrailer && (
        <div
          onClick={() => setPlayMovieTrailer(null)}
          className="fixed inset-0 flex justify-center items-center bg-black/90 z-50 animate-start-video"
        >
          <ReactPlayer
            url={playMovieTrailer}
            playing
            controls
            width={"70%"}
            height={"70%"}
            onEnded={() => setPlayMovieTrailer(null)}
          />
        </div>
      )}
      <section className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col  gap-8 flex-grow-[3]">
          <div className="flex gap-4 rounded-xl flex-col xl:flex-row ">
            <img
              src={baseImgURLFull + movie.movieData?.poster_path}
              alt={movie.movieData?.title}
              title={movie.movieData?.title}
              width={300}
              className="rounded-xl"
            />
            <div className="flex flex-col gap-4 items-start">
              <h1 className="text-3xl font-bold">
                {movie.movieData?.title} |{" "}
                <span className="text-xl">{movie.movieData?.tagline}</span>
              </h1>
              <div>
                <h3>Original Title : {movie.movieData?.original_title}</h3>
                <p>Release Date : {movie.movieData?.release_date}</p>
                <p>Rating : {movie.movieData?.vote_average}</p>
              </div>
              <p className="max-w-[60ch]">
                Overview : <br />
                {movie.movieData?.overview}
              </p>

              <div className="flex gap-4">
                <Button
                  onClick={() => setPlayMovieTrailer(movie.movieTrailer)}
                  variant={"dark"}
                  className="flex gap-2"
                >
                  Watch Movie Trailer <PlayCircle />
                </Button>
                <a
                  href={`https://www.imdb.com/title/${movie.movieData?.imdb_id}/`}
                  target="_blank"
                >
                  <Button variant={"ghost"} className="flex gap-2">
                    IMDB <ArrowRight />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* TODO create related movies */}
        <div className="w-60 h-full bg-white text-secondary-dark flex-grow-[1]">
          Related Movies
        </div>
      </section>
    </>
  );
}
