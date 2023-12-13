import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { CitySkeleton } from '@/shared/components/skeletons/city-skeleton';
import { LocationIcon } from '@/shared/icons/LocationIcon';

interface Props {
  city: string | undefined;
  onFormSubmit: (city: string) => void;
  handleGetMyLocation: () => void;
  isLoading: boolean;
}

export const LocationBlock: FC<Props> = ({
  city,
  onFormSubmit,
  handleGetMyLocation,
  isLoading
}) => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsInputVisible(false);
    e.preventDefault();
    localStorage.setItem('selected-city', inputValue);
    onFormSubmit(inputValue);
    setInputValue('');
  };

  return (
    <>
      {isInputVisible ? (
        <form className="w-1/2 relative" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="text-black text-[30px] h-[100px] w-full p-8"
            value={inputValue}
            onChange={(e) => handleChangeInput(e)}
          />
          <button type="submit" className="h-full absolute right-0 text-[#1086FF] text-[30px] px-8">
            OK
          </button>
        </form>
      ) : (
        <div className="flex flex-col">
          {!isLoading && city ? (
            <span className="text-[32px] md:text-[50px]">{city}</span>
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
              className="flex items-center gap-1 opacity-60 hover:opacity-100 md:text-lg"
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
