import { useEffect, useState } from 'react';

import { WeatherAdditionalInfo } from '@/entities/weather-additional-info';
import { WeatherMainInfo } from '@/entities/weather-main-info';
import { useGetCityInfo, useGetForecast } from '@/pages/weather-page/model';
import { UnitsType } from '@/shared/types';
import { WeatherControllers } from '@/widgets/weather-controllers';

export const WeatherPage = () => {
  const [currentLatitude, setCurrentLatitude] = useState<number>();
  const [currentLongitude, setCurrentLongitude] = useState<number>();
  const [selectedCity, setSelectedCity] = useState<string>(localStorage.getItem('selected-city'));
  const [units, setUnits] = useState<UnitsType>('metric');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    });
  }, [currentLatitude, currentLongitude]);

  const cityInfo = useGetCityInfo(selectedCity, currentLatitude, currentLongitude);
  const weatherInfo = useGetForecast(cityInfo.data?.latitude, cityInfo.data?.longitude, units);

  const handleChangeUnits = (units: UnitsType) => {
    setUnits(units);
  };

  const handleChangeCity = (city: string) => {
    setSelectedCity(city);
  };

  const handleShowMyLocation = () => {
    setSelectedCity(null);
    localStorage.removeItem('selected-city');
  };

  return (
    <main className="flex w-screen h-screen bg-[#498CEC] flex-col justify-between px-10 py-8 text-white md:px-20 md:py-16">
      <WeatherControllers
        city={cityInfo.data?.city}
        units={units}
        onChangeUnits={handleChangeUnits}
        onFormSubmit={handleChangeCity}
        handleGetMyLocation={handleShowMyLocation}
        isLoading={cityInfo.isLoading || weatherInfo.isLoading}
      />
      <WeatherMainInfo
        icon={weatherInfo.data?.weather.icon}
        temperature={weatherInfo.data?.temp}
        description={weatherInfo.data?.weather.description}
        isLoading={cityInfo.isLoading || weatherInfo.isLoading}
      />
      <WeatherAdditionalInfo
        windSpeed={weatherInfo.data?.wind_speed}
        pressure={weatherInfo.data?.pressure}
        humidity={weatherInfo.data?.humidity}
        direction={weatherInfo.data?.wind_direction}
        isLoading={cityInfo.isLoading || weatherInfo.isLoading}
      />
    </main>
  );
};
