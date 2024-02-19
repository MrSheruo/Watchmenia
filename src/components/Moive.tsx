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
  release_date,
  title,
  adult,
}: MovieProps) {
  const movieGenres = getFirstFourGenres(genre_ids);
  return (
    <div className="flex flex-col gap-2 w-fit">
      <Link to={`/movie/${id}`} reloadDocument className="relative">
        <img
          src={baseImgURL + backdrop_path}
          alt={title}
          className="block rounded-xl"
          width={300}
        />
        <div className="absolute top-2 left-2 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {adult === false ? "PG-13" : "R"}
        </div>
        <div className="px-2 flex flex-col justify-between ">
          <h4 className="font-semibold sm:max-w-[35ch] my-2 ">{title}</h4>
          <pre>{release_date}</pre>
        </div>
        <div className="flex gap-1">
          {movieGenres.map((genre, i) => {
            if (i === 4) return;
            return <Badge key={i}>{genre?.name}</Badge>;
          })}
        </div>
      </Link>
    </div>
  );
}
