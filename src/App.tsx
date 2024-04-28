import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { city } from "./interfaces/Interfaces";

import { cities } from "country-cities";

function App() {
  const [dataFromChild, setDataFromChild] = useState<city>();

  function handleDataFromChild(data: city) {
    setDataFromChild(data);
  }

  function getAllCities() {
    return cities.all();
  }

  return (
    <>
      <div className="App">
        <SearchBar
          placeholder="Enter a City..."
          allCities={getAllCities()}
          callback={handleDataFromChild}
        />
        <div className="a">
          {dataFromChild !== undefined && (
            <div>
              <h1>{dataFromChild.name}</h1>
              <h1>lat = {Number(dataFromChild.latitude).toFixed(2)}</h1>
              <h1>lon = {Number(dataFromChild.longitude).toFixed(2)}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
