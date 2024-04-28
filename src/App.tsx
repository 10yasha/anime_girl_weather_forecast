import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

import { cities } from "country-cities";

function App() {
  function getCities(name: string) {
    return cities.all().filter((city) => city.name.match(name));
  }

  function getAllCities() {
    return cities.all().slice(1, 10);
  }

  return (
    <>
      <div className="App">
        <SearchBar placeholder="Enter a City..." data={getAllCities()} />
      </div>
    </>
  );
}

export default App;
