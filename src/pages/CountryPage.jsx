import { useParams, useNavigate } from "react-router-dom";
import useCountry from "../hooks/useCountry";
import "../styles/App.css";

function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { country, loading, error } = useCountry(code);

  if (loading) {
    return <p className="page-status">Loading...</p>;
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>;
  }

  if (!country) {
    return <p className="page-status">No country data found.</p>;
  }

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country;

  const languageList = Object.values(languages || {});
  const currencyList = Object.values(currencies || {}).map((c) => c.name);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="country-page">
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>

      <div className="country-page__layout">
        <img
          src={flags?.svg}
          alt={name?.common || "Country flag"}
          className="country-page__flag"
          onError={(e) => {
            e.target.src = "/fallback-flag.png";
          }}
        />

        <div className="country-page__info">
          <h2 className="country-page__name">
            {name?.common || "N/A"}
          </h2>
          <p className="country-page__official">
            {name?.official || "N/A"}
          </p>

          <div className="country-page__details">
            <div>
              <p>
                <strong>Population:</strong>{" "}
                {population ? population.toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>Region:</strong> {region || "N/A"}
              </p>
              <p>
                <strong>Subregion:</strong> {subregion || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong> {capital?.[0] || "N/A"}
              </p>
            </div>

            <div>
              <p>
                <strong>Languages:</strong>{" "}
                {languageList.length ? languageList.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {currencyList.length ? currencyList.join(", ") : "N/A"}
              </p>
            </div>
          </div>

          {borders && borders.length > 0 && (
            <div className="country-page__borders">
              <strong>Borders:</strong>
              <div>
                {borders.map((b) => (
                  <button
                    key={b}
                    className="border-badge"
                    onClick={() => navigate(`/country/${b}`)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;