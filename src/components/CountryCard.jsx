import { useFavourites } from "../context/FavouritesContext";
import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const { favourites, dispatch } = useFavourites();

  const { cca3, flags, name, population, region } = country;

  const isSaved = favourites.some((f) => f.cca3 === cca3);

  const handleFavourite = (e) => {
    e.stopPropagation();

    if (isSaved) {
      dispatch({ type: "REMOVE_FAVOURITE", payload: cca3 });
    } else {
      dispatch({ type: "ADD_FAVOURITE", payload: country });
    }
  };

  return (
    <Link to={`/country/${cca3}`} className="card">
      <img src={flags?.png} alt={name?.common} />

      <div className="card__body">
        <h3>{name?.common}</h3>
        <p>{region}</p>
        <p>{population?.toLocaleString()}</p>

        <button
          className={`fav-btn ${isSaved ? "fav-btn--saved" : ""}`}
          onClick={handleFavourite}
        >
          {isSaved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </Link>
  );
}

export default CountryCard;