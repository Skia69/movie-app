import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { constructUrl } from "../API";
import { StateContext } from "../context/StateProvider";

export const Navbar = () => {
  const [value, setValue] = useState("");
  const [, dispatch] = useContext(StateContext);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMovies(value);
    //Hide the spinner
    setValue("");
    //This is causing a bug where the fetch request would fire twice
    // Idk how to fix it XD
    history.push(`/search/${value}`);
  };

  const handleClick = () => {
    history.push("/");
  };

  const handleMovies = async (query) => {
    const { results } = await (
      await fetch(constructUrl("search/movie", query))
    ).json();
    dispatch({ type: "SET_MOVIES", payload: results });
  };

  return (
    <div className="container absolute z-10 flex mx-auto justify-evenly">
      <button onClick={handleClick}>Home</button>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Insert a movie name..."
          type="text"
          required
        />
        <button type="submit">Search</button>
      </form>
      {value ? "fetching..." : ""}
    </div>
  );
};
