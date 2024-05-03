import "./AnimeWeatherAnchor.css";

import readyGIF from "../assets/weather_anchor/ready.gif";

export default function AnimeWeatherAnchor() {
  return (
    <div className="anime-gif">
      <img src={readyGIF} alt="readyGIF" />
    </div>
  );
}
