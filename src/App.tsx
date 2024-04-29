import React, { useState, useMemo } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import {
  City,
  EndpointType,
  WeatherDataProps,
  ForecastDataProps,
} from "./interfaces/Interfaces";
import axios from "axios";

import { cities } from "country-cities";

function App() {
  const api_key: string = import.meta.env.VITE_API_KEY;
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  const [dataFromChild, setDataFromChild] = useState<City>();
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();
  const [ForecastData, setForecastData] = useState<ForecastDataProps>();

  const handleDataFromChild = (data: City) => {
    setDataFromChild(data);
  };

  const getAllCities = () => {
    return cities.all();
  };

  const callWeatherAPI = async (
    lat: number,
    lon: number,
    endpoint: EndpointType
  ) => {
    try {
      const url = `${endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      const res = await axios.get(url);

      const currentWeatherData: WeatherDataProps = res.data;
      return { currentWeatherData };
    } catch (error) {
      throw error;
    }
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
