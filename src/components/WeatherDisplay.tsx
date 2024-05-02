import React from "react";
import "./WeatherDisplay.css";
import { City, WeatherDataProps } from "../interfaces/Interfaces";
import { getTemperature } from "../utility/utility";

import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { BiTachometer } from "react-icons/bi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";

export default function WeatherDisplay({
  weatherData,
}: {
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
        <h1>{getTemperature(weatherData.main.temp)}°C</h1>
        <h2>{weatherData.weather[0].main}</h2>

        <div className="additional-weather-info">
          <div className="additional-info-item">
            <WiHumidity className="additional-icon" />
            <div className="humidity-info">
              <h3>{weatherData.main.humidity} %</h3>
              <p>Humidity</p>
            </div>
          </div>

          <div className="additional-info-item">
            <FiWind className="additional-icon" />
            <div className="wind-info">
              <h3>{weatherData.wind.speed} km/h</h3>
              <p>Wind speed</p>
            </div>
          </div>

          <div className="additional-info-item">
            <BiTachometer className="additional-icon" />
            <div className="pressure-info">
              <h3>{weatherData.main.pressure} mbar</h3>
              <p>Pressure</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
