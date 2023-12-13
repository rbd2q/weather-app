import upperFirst from 'lodash/upperFirst';
import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@/shared/api/useApi';
import { API_KEY } from '@/shared/constants';
import {
  LocationType,
  NormalizedLocationType,
  NormalizedWeatherData,
  UnitsType,
  WeatherResponse
} from '@/shared/types';

const normalizeForecastData = (data: WeatherResponse): NormalizedWeatherData => ({
  ...data.current,
  temp: Math.round(data.current.temp),
  wind_speed: Math.round(data.current.wind_speed),
  weather: {
    ...data.current.weather[0],
    description: upperFirst(data.current.weather[0].description),
    icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  }
});

const normalizeCityInfo = (data: LocationType[]): NormalizedLocationType => ({
  city: data[0].local_names.ru,
  latitude: data[0].lat,
  longitude: data[0].lon
});

export const useGetForecast = (
  latitude: number | undefined,
  longitude: number | undefined,
  units: UnitsType = 'metric'
): UseQueryResult<NormalizedWeatherData> => {
  const api = useApi();
  const part = 'alerts,daily,hourly,minutely';

  return useQuery(['current-weather', latitude, longitude, units], async () => {
    try {
      if (!latitude || !longitude) {
        return;
      }
      const { data } = await api.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=${part}&appid=${API_KEY}&lang=ru`
      );
      return normalizeForecastData(data);
    } catch (error: unknown) {
      console.log(error);
    }
  });
};

export const useGetCityInfo = (
  cityName: string | undefined,
  latitude: number | undefined,
  longitude: number | undefined
): UseQueryResult<NormalizedLocationType> => {
  const api = useApi();

  return useQuery(['current-city', cityName, latitude, longitude], async () => {
    if (cityName) {
      try {
        const { data } = await api.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
        );
        return normalizeCityInfo(data);
      } catch (error: unknown) {
        console.log(error);
      }
    }

    if (latitude && longitude) {
      try {
        const { data } = await api.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}&lang=ru`
        );
        return normalizeCityInfo(data);
      } catch (error: unknown) {
        console.log(error);
      }
    }
  });
};
