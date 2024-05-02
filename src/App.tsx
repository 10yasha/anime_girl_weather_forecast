import React, { useState } from "react";

import GoogleMapReact from "google-map-react";

import "./App.css";
import SearchBar from "./components/SearchBar";
import AnimeWeatherAnchor from "./components/AnimeWeatherAnchor";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import MapDisplay from "./components/MapDisplay";
import {
  City,
  EndpointType,
  WeatherDataProps,
  ForecastDataProps,
} from "./interfaces/Interfaces";
import axios from "axios";

import { cities } from "country-cities";

export default function App() {
  const api_key: string = import.meta.env.VITE_API_KEY;
  const api_endpoint = "https://api.openweathermap.org/data/2.5/";
  // const kelvinToCelsius = -273.15;

  const [cityOfInterest, setCityOfInterest] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [forecastData, setForecastData] = useState<ForecastDataProps | null>(
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
    setWeatherData(
      (await callWeatherApiEndpoint(lat, lon, "weather")) as WeatherDataProps
    );
    setForecastData(
      (await callWeatherApiEndpoint(lat, lon, "forecast")) as ForecastDataProps
    );
  };

  return (
    <>
      <div className="app">
        <div>
          <SearchBar
            placeholder="Enter a City..."
            allCities={getAllCities()}
            callback={handleSearch}
          />
          <MapDisplay />
        </div>
        <div className="weather-display">
          {cityOfInterest !== null && (
            <div>
              {weatherData && forecastData && (
                <>
                  <div className="middle-section">
                    <div className="searched-city-name">
                      <h1>
                        {cityOfInterest.name} {cityOfInterest.countryCode}
                      </h1>
                    </div>
                    <div className="current-weather">
                      <WeatherDisplay
                        cityOfInterest={cityOfInterest}
                        weatherData={weatherData}
                      />
                      <AnimeWeatherAnchor />
                    </div>
                  </div>
                  <div className="bottom-section">
                    <ForecastDisplay />
                  </div>
                </>
              )}
            </div>
          )}
          {cityOfInterest == null && (
            <div>
              <AnimeWeatherAnchor />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
