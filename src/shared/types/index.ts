export type UnitsType = 'metric' | 'imperial';

export type LocationType = {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
};

export type WeatherResponse = {
  current: WeatherData;
};

export type WeatherData = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

export type NormalizedWeatherData = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
};

export type NormalizedLocationType = {
  city: string;
  latitude: number;
  longitude: number;
};
