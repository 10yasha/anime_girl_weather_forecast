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
          <div className="forecast-item">
            <h3>{getTemperature(data.main.temp)}°C</h3>
            {data.dt_txt && (
              <>
                <h3>{getDate(data.dt_txt)}</h3>
                <h3>{getHour(data.dt_txt)}</h3>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
