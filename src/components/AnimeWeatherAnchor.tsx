import "./AnimeWeatherAnchor.css";

import readyGIF from "../assets/weather_anchor/ready.gif";

export default function AnimeWeatherAnchor() {
  return (
    <div className="anime-gif-container">
      <img src={readyGIF} alt="readyGIF" className="anime-gif" />
    </div>
  );
}
