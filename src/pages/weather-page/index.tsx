import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useGetCityInfo, useGetForecast } from '@/pages/weather-page/model';
import { CitySkeleton } from '@/shared/components/skeleton';
import { LocationIcon } from '@/shared/icons/LocationIcon';
import { UnitsType } from '@/shared/types';

export const WeatherPage = () => {
  const [currentLatitude, setCurrentLatitude] = useState<number>();
  const [currentLongitude, setCurrentLongitude] = useState<number>();
  const [selectedCity, setSelectedCity] = useState<string>(localStorage.getItem('selected-city'));
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [units, setUnits] = useState<UnitsType>('metric');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    });
  }, [currentLatitude, currentLongitude]);

  const cityInfo = useGetCityInfo(selectedCity, currentLatitude, currentLongitude);
  const weatherInfo = useGetForecast(cityInfo.data?.latitude, cityInfo.data?.longitude, units);

  const handleSubmitCity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedCity(inputValue);
    localStorage.setItem('selected-city', inputValue);
    setInputValue('');
    setIsInputVisible(false);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleShowMyLocation = () => {
    setSelectedCity(null);
    localStorage.removeItem('selected-city');
  };

  return (
    <main className="flex w-screen h-screen bg-[#498CEC] flex-col justify-between px-20 py-16 text-white">
      <div className="flex justify-between items-center">
        {isInputVisible ? (
          <form className="w-1/2 relative" onSubmit={(e) => handleSubmitCity(e)}>
            <input
              className="text-black text-[30px] h-[100px] w-full p-8"
              value={inputValue}
              onChange={(e) => handleChangeInput(e)}
            />
            <button className="h-full absolute right-0 text-[#1086FF] text-[30px] px-8">OK</button>
          </form>
        ) : (
          <div className="flex flex-col">
            {cityInfo.data?.city ? (
              <span className="text-[50px]">{cityInfo.data.city}</span>
            ) : (
              <CitySkeleton />
            )}
            <div className="flex flex-wrap justify-center">
              <button className="opacity-60 text-lg mr-6" onClick={() => setIsInputVisible(true)}>
                Сменить город
              </button>
              <button
                className="flex items-center gap-1 opacity-60 text-lg"
                onClick={handleShowMyLocation}>
                <LocationIcon />
                <span>Мое местоположение</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex wrap-nowrap text-xl text-white">
          <span className="mr-2">º</span>
          <button
            className={`border border-white opacity-40 rounded-l-lg px-2 py-1 ${
              units === 'metric' && 'bg-white opacity-100 bg-opacity-20'
            }`}
            onClick={() => setUnits('metric')}>
            C
          </button>
          <button
            className={`border border-white opacity-40 rounded-r-lg px-2 py-1 ${
              units === 'imperial' && 'bg-white opacity-100 bg-opacity-20'
            }`}
            onClick={() => setUnits('imperial')}>
            F
          </button>
        </div>
      </div>

      {weatherInfo.data ? (
        <div className="flex flex-col items-center text-white">
          <span className="flex items-center">
            <img
              className="w-[200px] h-[200px]"
              src={weatherInfo.data?.weather.icon}
              alt="weather icon"
            />
            <span className="text-[180px]">{weatherInfo.data.temp}º</span>
          </span>
          <span className="text-[25px]">{weatherInfo.data.weather.description}</span>
        </div>
      ) : null}

      {weatherInfo.data ? (
        <div className="flex justify-between flex-wrap">
          <div className="flex flex-col">
            <span className="opacity-60 text-lg">Ветер</span>
            <span className="text-2xl mt-10px">{weatherInfo.data.wind_speed} м/c, западный</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-60 text-lg">Давление</span>
            <span className="text-2xl mt-10px">{weatherInfo.data.pressure} мм рт. ст.</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-60 text-lg">Влажность</span>
            <span className="text-2xl mt-10px">{weatherInfo.data.humidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-60 text-lg">Вероятность дождя</span>
            <span className="text-2xl mt-10px">10%</span>
          </div>
        </div>
      ) : null}
    </main>
  );
};
