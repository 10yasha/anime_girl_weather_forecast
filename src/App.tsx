import React, { useState, useMemo } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { city } from "./interfaces/Interfaces";

import { cities } from "country-cities";

function App() {
  const api_key: string = import.meta.env.VITE_API_KEY;
  const [dataFromChild, setDataFromChild] = useState<city>();

  const handleDataFromChild = (data: city) => {
    setDataFromChild(data);
  };

  const getAllCities = () => {
    return cities.all();
  };

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
