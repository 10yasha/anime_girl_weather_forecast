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
  const api_endpoint = "https://api.openweathermap.org/data/2.5/";
  // const kelvinToCelsius = -273.15;

  const [cityOfInterest, setCityOfInterest] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [ForecastData, setForecastData] = useState<ForecastDataProps | null>(
    null
  );

  const handleSearch = async (data: City) => {
    console.log("handleSearch");
    setCityOfInterest(data);
    await callWeatherApi(
      String(Number(data.latitude).toFixed(2)),
      String(Number(data.longitude).toFixed(2))
    );
  };

  const getAllCities = () => {
    return cities.all();
  };

  const callWeatherApiEndpoint = async (
    lat: string,
    lon: string,
    endpoint: EndpointType
  ) => {
    console.log("callWeatherApiEndpoint");
    console.log(
      api_endpoint +
        `${endpoint}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );
    try {
      const url =
        api_endpoint +
        `${endpoint}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      console.log(url);
      const res = await axios.get(url);

      const data: WeatherDataProps | ForecastDataProps = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const callWeatherApi = async (lat: string, lon: string) => {
    console.log("callWeatherApi");
    setWeatherData(
      (await callWeatherApiEndpoint(lat, lon, "weather")) as WeatherDataProps
    );
    setForecastData(
      (await callWeatherApiEndpoint(lat, lon, "forecast")) as ForecastDataProps
    );
  };

  return (
    <>
      <div className="App">
        <SearchBar
          placeholder="Enter a City..."
          allCities={getAllCities()}
          callback={handleSearch}
        />
        <div className="a">
          {cityOfInterest !== null && (
            <div>
              <h1>{cityOfInterest.name}</h1>
              <h1>lat = {Number(cityOfInterest.latitude).toFixed(2)}</h1>
              <h1>lon = {Number(cityOfInterest.longitude).toFixed(2)}</h1>
              {weatherData && <h1>{weatherData.main.temp}</h1>}
              {ForecastData && <h1>{ForecastData.list[0].main.temp}</h1>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
