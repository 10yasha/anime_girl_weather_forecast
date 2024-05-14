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
  const iconSize = 40;

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill size={iconSize} />;
        iconColor = "#272829";
        break;
      case "Clear":
        iconElement = <BsFillSunFill size={iconSize} />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill size={iconSize} />;
        iconColor = "#102C57";
        break;
      case "Mist":
        iconElement = <BsCloudFog2Fill size={iconSize} />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny size={iconSize} />;
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
        <div className="icon-container">
          {iconChanger(weatherData.weather[0].main)}
        </div>
        <h2>{weatherData.weather[0].main}</h2>
        <h1>{getTemperature(weatherData.main.temp)}°C</h1>

        <div className="additional-weather-info">
          <div className="additional-info-item">
            <WiHumidity className="additional-icon" />
            <p>Humidity</p>
            <h3>{weatherData.main.humidity} %</h3>
          </div>

          <div className="additional-info-item">
            <FiWind className="additional-icon" />
            <p>Wind</p>
            <h3>{weatherData.wind.speed} km/h</h3>
          </div>

          <div className="additional-info-item">
            <BiTachometer className="additional-icon" />
            <p>Pressure</p>
            <h3>{weatherData.main.pressure} mb</h3>
          </div>
        </div>
      </div>
    </>
  );
}
