import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../context/StateProvider";

export const MoviePage = () => {
  const { id } = useParams();
  const [{ details }, dispatch] = useContext(StateContext);

  useEffect(() => {
    const fetchDetails = async (id) => {
      const data = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5&language=en-US&append_to_response=videos,credits`
        )
      ).json();
      dispatch({ type: "SET_DETAILS", payload: data });
      console.log("movie page", data);
    };
    fetchDetails(id);
  }, [dispatch, id]);

  return (
    <>
      {!details && "loading details..."}
      {details && (
        <div>
          <img
            loading="lazy"
            style={{ maxWidth: "100%" }}
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.backdrop_path}
          />
          <h1>{details.title}</h1>
          <h5>{details.release_date}</h5>
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
            alt={details.poster_path}
          />
          <h3>{details.vote_average}</h3>
          <p>{details.overview}</p>
          <p>{details.genres.map(({ name }) => name)}</p>
          <iframe
            title={details.videos.results[0].name}
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${details.videos.results[0].key}`}></iframe>
          <ul>
            {details.credits.cast.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
