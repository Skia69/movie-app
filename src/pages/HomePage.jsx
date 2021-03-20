import { useContext, useEffect, useState } from "react";
import { MoviesGrid, Filter } from "../components";
import { StateContext } from "../context";
import "./test.css";

export const HomePage = () => {
  const [{ movies }, dispatch] = useContext(StateContext);
  const [trendingMovie, setTrendingMovie] = useState();
  //Trending movies of the day
  // https://api.themoviedb.org/3/trending/movie/day?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5
  const GENRES = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    const handleMovies = async () => {
      const { results } = await (
        await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5&language=en-US&page=1"
        )
      ).json();
      dispatch({ type: "SET_MOVIES", payload: results });
      console.log("home page", results);
    };

    const trendingMovies = async () => {
      const { results } = await (
        await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5"
        )
      ).json();
      setTrendingMovie(results);
    };
    trendingMovies();
    handleMovies();
  }, [dispatch]);

  return (
    <div className="">
      {trendingMovie ? (
        <div
          className="relative flex items-center w-full gradient"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${trendingMovie[0].backdrop_path}")`,
            height: "90vh",
          }}>
          <div className="absolute inset-0 gradient"></div>
          <div className="container mx-auto">
            <div className="">
              <div className="mb-16 font-semibold uppercase text-8xl">
                {trendingMovie[0].original_title}
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-grid grid-cols-2 gap-y-2 gap-x-12">
                    <div className="inline-flex gap-4">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {trendingMovie[0].release_date.split("-")[0]}
                    </div>
                    <div className="inline-flex gap-6 text-red-500">
                      Rate{" "}
                      <span className="px-1 text-white border border-white">
                        R
                      </span>
                    </div>
                    <div className="inline-flex gap-4">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      45 mins
                    </div>
                    <div className="inline-flex gap-4 text-red-500">
                      IMDb
                      <span className="text-white">
                        {trendingMovie[0].vote_average}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    {trendingMovie[0].genre_ids.map((id) => (
                      <span
                        key={id}
                        className="px-2 border border-red-500 rounded-sm">
                        {GENRES[id]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-red-500">
                    Stars{" "}
                    <span className="text-white">
                      Chris Evans, Michelle Dockery, Jaeden Martell
                    </span>
                  </div>
                  <div className="text-red-500">
                    Director <span className="text-white">Mark Bomback</span>
                  </div>
                  <div className="max-w-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas adipisci, magni provident temporibus deserunt mollitia
                    unde consequatur modi, eveniet soluta nesciunt vel earum
                    doloremque esse.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading..."
      )}
      <Filter className="p-24 w-36" />
      <MoviesGrid movies={movies} />
    </div>
  );
};
