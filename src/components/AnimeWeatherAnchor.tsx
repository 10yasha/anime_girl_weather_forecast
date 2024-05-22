import { useState, useEffect } from "react";

import "./AnimeWeatherAnchor.css";

import angryGIF from "../assets/weather_anchor/angry.gif";
import depressedGIF from "../assets/weather_anchor/angry.gif";
import eating1GIF from "../assets/weather_anchor/eating1.gif";
import eating2GIF from "../assets/weather_anchor/eating2.gif";
import eating3GIF from "../assets/weather_anchor/eating3.gif";
import eating4GIF from "../assets/weather_anchor/eating4.gif";
import happy1GIF from "../assets/weather_anchor/happy1.gif";
import happy2GIF from "../assets/weather_anchor/happy2.gif";
import questionGIF from "../assets/weather_anchor/question.gif";
import rainGIF from "../assets/weather_anchor/rain.gif";
import readyGIF from "../assets/weather_anchor/ready.gif";
import snowGIF from "../assets/weather_anchor/snow.gif";

import tvOutline from "../assets/weather_anchor/tv_outline.png";

export default function AnimeWeatherAnchor({
  currentCity,
}: {
  currentCity: string;
}) {
  const gifsArray = [
    angryGIF,
    depressedGIF,
    eating1GIF,
    eating2GIF,
    eating3GIF,
    eating4GIF,
    happy1GIF,
    happy2GIF,
    questionGIF,
    rainGIF,
    snowGIF,
  ];

  const [currentGif, setCurrentGif] = useState<string>(readyGIF);

  useEffect(() => {
    setCurrentGif(getRandomGif());
  }, [currentCity]);

  const getRandomGif = () => {
    const randomGif = gifsArray[Math.floor(Math.random() * gifsArray.length)];
    return randomGif;
  };

  return (
    <div className="weather-anchor">
      <div className="anime-gif-container">
        <img src={tvOutline} alt="overlay" className="tv-overlay" />
        {currentCity == "" ? (
          <img src={readyGIF} alt="character" className="anime-gif" />
        ) : (
          <img src={currentGif} alt="character" className="anime-gif" />
        )}
      </div>
    </div>
  );
}
