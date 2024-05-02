import React, { useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";

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

export default function App() {
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

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
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
              {weatherData && (
                <>
                  <div className="weatherArea">
                    <h3>{cityOfInterest.name}</h3>
                    <span>{cityOfInterest.countryCode}</span>
                  </div>

                  <div className="bottomInfoArea">
                    <div className="icon">
                      {iconChanger(weatherData.weather[0].main)}
                    </div>
                    <h1>{weatherData.main.temp.toFixed(0)}</h1>
                    <h2>{weatherData.weather[0].main}</h2>
                    <div className="humidityLevel">
                      <WiHumidity className="windIcon" />
                      <div className="humidInfo">
                        <h1>{weatherData.main.humidity}%</h1>
                        <p>Humidity</p>
                      </div>
                    </div>

                    <div className="wind">
                      <FiWind className="windIcon" />
                      <div className="humidInfo">
                        <h1>{weatherData.wind.speed}km/h</h1>
                        <p>Wind speed</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
