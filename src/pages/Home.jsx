import { useState } from "react";
import FilterBar from "../components/FilterBar";
import CountryCard from "../components/CountryCard";

function Home({ countries }) {
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const displayed = [...countries]
    .filter((c) => region === "All" || c.region === region)
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.common.localeCompare(b.name.common);
      }
      if (sortBy === "population") {
        return b.population - a.population;
      }
      return 0;
    });

  return (
    <div>
      <FilterBar
        region={region}
        onRegionChange={setRegion}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="cards-grid">
        {displayed.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Home;