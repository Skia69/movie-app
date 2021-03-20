import React, { useContext, useState } from "react";
import { StateContext } from "../context/StateProvider";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const Filter = () => {
  const [isActive, setIsActive] = useState(0);
  const [, dispatch] = useContext(StateContext);

  const handleClick = async (id) => {
    setIsActive(id);

    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5&language=en-US&with_genres=${id}&page=1`
      )
    ).json();
    dispatch({ type: "SET_MOVIES", payload: results });
    console.log(isActive);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 mx-auto">
      {GENRES.map((genre) => (
        <button
          key={genre.id}
          className={
            isActive === genre.id
              ? "border rounded-sm px-1 bg-red-500 border-red-500"
              : ""
          }
          onClick={() => handleClick(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  );
};
