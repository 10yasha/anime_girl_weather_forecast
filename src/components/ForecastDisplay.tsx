import "./ForecastDisplay.css";
import { ForecastDataProps } from "../interfaces/Interfaces";
import { getTemperature, getDate, getHour } from "../utility/utility";

export default function ForecastDisplay({
  forecastData,
}: {
  forecastData: ForecastDataProps;
}) {
  return (
    <div className="forecast-info">
      {forecastData.list.map((data) => {
        return (
          <div className="forecast-item" key={data.dt_txt}>
            <h2>{getTemperature(data.main.temp)}°C</h2>
            {data.dt_txt && (
              <>
                <h4>{getDate(data.dt_txt)}</h4>
                <h4>{getHour(data.dt_txt)}</h4>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
