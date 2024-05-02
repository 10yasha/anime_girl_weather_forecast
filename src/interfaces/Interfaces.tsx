export interface City {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: string;
  longitude: string;
}

export type EndpointType = "forecast" | "weather";

type WeatherSubField = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainSubField = {
  temp: number; // celsius
  feels_like: number; // celsius
  temp_min: number; // celsius
  temp_max: number; // celsius
  pressure: number; // millibars
  humidity: number; // percent?
  [x: string]: any;
};

type WindSubField = {
  speed: number; // km/hr
  [x: string]: any;
};

type CloudsSubField = {
  all: number; // percent
};

export interface WeatherDataProps {
  main: MainSubField;
  weather: WeatherSubField[];
  clouds: CloudsSubField;
  wind: WindSubField;
  visibility: number; // meters
  [x: string]: any;
}

export interface ForecastDataProps {
  list: WeatherDataProps[];
  [x: string]: any;
}
