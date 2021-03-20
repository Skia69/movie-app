import { useContext } from "react";
import { MoviesGrid, Filter } from "../components";
import { StateContext } from "../context";

export const SearchPage = () => {
  const [{ movies }] = useContext(StateContext);

  console.log("search page", movies);

  return (
    <div className="p-24">
      <Filter className="flex-shrink-0 h-full p-24 w-36" />
      <MoviesGrid movies={movies} />
    </div>
  );
};
