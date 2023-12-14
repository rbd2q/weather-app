import { FC, useState } from 'react';

import { ChangeCityForm } from '@/shared/components/change-city-form';
import { CitySkeleton } from '@/shared/components/skeletons/city-skeleton';
import { LocationIcon } from '@/shared/icons/LocationIcon';

interface Props {
  city: string | undefined;
  handleChangeCity: (city: string) => void;
  handleGetMyLocation: () => void;
  isLoading: boolean;
}

export const LocationBlock: FC<Props> = ({
  city,
  handleChangeCity,
  handleGetMyLocation,
  isLoading
}) => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

  const onSubmit = (value: string) => {
    setIsInputVisible(false);
    handleChangeCity(value);
  };

  return (
    <>
      {isInputVisible ? (
        <ChangeCityForm onSubmit={onSubmit} />
      ) : (
        <div className="flex flex-col">
          {!isLoading && city ? (
            <span className="text-3xl md:text-text-5xl">{city}</span>
          ) : (
            <CitySkeleton />
          )}
          <div className="flex flex-wrap">
            <button
              disabled={isLoading}
              className="opacity-60 mr-6 hover:opacity-100 md:text-lg"
              onClick={() => setIsInputVisible(true)}>
              Сменить город
            </button>
            <button
              disabled={isLoading}
              className="flex flex-row-reverse items-center text-left gap-1 opacity-60 hover:opacity-100 md:text-lg sm:flex-row"
              onClick={handleGetMyLocation}>
              <LocationIcon />
              <span>Мое местоположение</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
