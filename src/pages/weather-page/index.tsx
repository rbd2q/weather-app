import { useEffect, useState } from 'react';

import { LocationBlock } from '@/entities/location-block';
import { WeatherAdditionalInfo } from '@/entities/weather-additional-info';
import { WeatherMainInfo } from '@/entities/weather-main-info';
import { useGetCityInfo, useGetForecast } from '@/pages/weather-page/model';
import { UnitsSwitcher } from '@/shared/components/units-switcher';
import { UnitsType } from '@/shared/types';

export const WeatherPage = () => {
  const [currentLatitude, setCurrentLatitude] = useState<number>();
  const [currentLongitude, setCurrentLongitude] = useState<number>();
  const [selectedCity, setSelectedCity] = useState<string>(localStorage.getItem('selected-city'));
  const [units, setUnits] = useState<UnitsType>('metric');

  const cityInfo = useGetCityInfo(selectedCity, currentLatitude, currentLongitude);
  const weatherInfo = useGetForecast(cityInfo.data?.latitude, cityInfo.data?.longitude, units);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    });
  }, []);

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
    <main className="flex min-w-screen min-h-screen bg-[#498CEC] flex-col justify-between px-10 py-8 text-white md:px-20 md:py-16">
      <div className="flex justify-between items-start md:items-center">
        <LocationBlock
          city={cityInfo.data?.city}
          handleChangeCity={handleChangeCity}
          handleGetMyLocation={handleShowMyLocation}
          isLoading={cityInfo.isLoading}
        />
        <UnitsSwitcher
          activeUnits={units}
          onChangeUnits={handleChangeUnits}
          isLoading={cityInfo.isLoading}
        />
      </div>
      <WeatherMainInfo
        icon={weatherInfo.data?.weather.icon}
        temperature={weatherInfo.data?.temp}
        description={weatherInfo.data?.weather.description}
        isLoading={weatherInfo.isLoading || !weatherInfo.data}
      />
      <WeatherAdditionalInfo
        windSpeed={weatherInfo.data?.wind_speed}
        windDirection={weatherInfo.data?.wind_direction}
        pressure={weatherInfo.data?.pressure}
        humidity={weatherInfo.data?.humidity}
        isLoading={weatherInfo.isLoading || !weatherInfo.data}
      />
    </main>
  );
};
