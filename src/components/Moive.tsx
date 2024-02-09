import { Link } from "react-router-dom";
import { Movie } from "../types";
import { baseImgURL } from "../config";
import Badge from "./Badge";
import { getFirstFourGenres } from "../lib/utlis";
type MovieProps = Movie;

export default function Moive({
  backdrop_path,
  genre_ids,
  id,
  original_title,
  release_date,
  title,
  adult,
}: MovieProps) {
  const movieGenres = getFirstFourGenres(genre_ids);
  return (
    <div className="flex flex-col gap-2">
      <Link to={`/movie/${id}`} className="relative aspect-video">
        <img
          src={baseImgURL + backdrop_path}
          alt={title}
          className="block w-full h-full object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {adult === false ? "PG-13" : "R"}
        </div>
      </Link>
      <div className="px-2 flex flex-col justify-between">
        <h4 className="font-semibold">{original_title}</h4>
        <pre>{release_date}</pre>
      </div>
      <div className="flex gap-1">
        {movieGenres.map((genre, i) => {
          if (i === 4) return;
          return <Badge key={i}>{genre?.name}</Badge>;
        })}
      </div>
    </div>
  );
}
