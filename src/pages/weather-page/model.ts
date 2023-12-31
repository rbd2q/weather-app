import { AxiosError } from 'axios';
import upperFirst from 'lodash/upperFirst';
import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@/shared/api/useApi';
import { showErrorToast } from '@/shared/components/toast';
import { API_KEY } from '@/shared/constants';
import { convertDegreesToDirection } from '@/shared/helpers';
import {
  LocationType,
  NormalizedLocationType,
  NormalizedWeatherData,
  UnitsType,
  WeatherResponse
} from '@/shared/types';

const checkData = <T>(data: T) => {
  if (!data)
    throw new AxiosError('Что-то пошло не так при загрузке данных, перезагрузите страницу');
};

const normalizeForecastData = (data: WeatherResponse): NormalizedWeatherData => ({
  ...data.current,
  temp: Math.round(data.current.temp),
  wind_speed: Math.round(data.current.wind_speed),
  wind_direction: convertDegreesToDirection(data.current.wind_deg),
  // TODO replace with real data when it is implemented
  rain_probability: 10,
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
  units: UnitsType
): UseQueryResult<NormalizedWeatherData> => {
  const api = useApi();
  const excludedParts = 'alerts,daily,hourly,minutely';

  return useQuery(['city-weather', latitude, longitude, units], async () => {
    try {
      if (!latitude || !longitude) {
        return;
      }
      const { data } = await api.get(
        `/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=${excludedParts}&appid=${API_KEY}&lang=ru`
      );
      checkData(data);
      return normalizeForecastData(data);
    } catch (error: unknown) {
      showErrorToast(error.message ?? 'Что-то пошло не так');
    }
  });
};

export const useGetCityInfo = (
  cityName: string | undefined,
  latitude: number | undefined,
  longitude: number | undefined
): UseQueryResult<NormalizedLocationType> => {
  const api = useApi();

  return useQuery(['city-info', cityName, latitude, longitude], async () => {
    if (!cityName && !longitude && !latitude) {
      return;
    }

    try {
      const { data } = cityName
        ? await api.get(`/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
        : await api.get(
            `/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}&lang=ru`
          );
      checkData(data.length);
      return normalizeCityInfo(data);
    } catch (error: unknown) {
      localStorage.removeItem('selected-city');
      if (error instanceof AxiosError) {
        showErrorToast(error.message ?? 'Что-то пошло не так');
      }
    }
  });
};
