export const MovieItem = ({
  id,
  original_title,
  release_date,
  poster_path,
  title,
}) => {
  return (
    <div data-id={id}>
      <img
        loading="lazy"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w200` + poster_path
            : "https://via.placeholder.com/200x300"
        }
        alt={title}
      />
      <h6>{original_title}</h6>
      <p>{release_date ? release_date : "Unknown release date"}</p>
    </div>
  );
};

// const truncate = (str) => {
// 	return str.length > 50 ? str.substring(0, 25) + '...' : str;
// };
