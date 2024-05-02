import React from "react";
import "./WeatherDisplay.css";
import { City, WeatherDataProps } from "../interfaces/Interfaces";

import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";

export default function WeatherDisplay({
  cityOfInterest,
  weatherData,
}: {
  cityOfInterest: City;
  weatherData: WeatherDataProps;
}) {
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
      <div className="weather-info">
        <div className="icon">{iconChanger(weatherData.weather[0].main)}</div>
        <h1>{weatherData.main.temp.toFixed(0)}</h1>
        <h2>{weatherData.weather[0].main}</h2>

        <div className="humidityLevel">
          <WiHumidity className="windIcon" />
          <div className="humidInfo">
            <h1>{weatherData.main.humidity}%</h1>
            <p>Humidity</p>
          </div>
        </div>

        <div className="Wind">
          <FiWind className="windIcon" />
          <div className="humidInfo">
            <h1>{weatherData.wind.speed}km/h</h1>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </>
  );
}
