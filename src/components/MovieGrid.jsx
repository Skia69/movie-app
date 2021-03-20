import { Link } from "react-router-dom";
import { MovieItem } from "./MovieItem";

export const MoviesGrid = ({ movies }) => {
  return (
    <div className="container grid grid-cols-5 gap-24 mx-auto">
      {!movies.length && "loading..."}
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <MovieItem {...movie} />
        </Link>
      ))}
    </div>
  );
};
