import { FC } from 'react';

import { AdditionalInfoSkeleton } from '@/shared/components/skeletons/additional-info-skeleton';

interface Props {
  windSpeed: number | undefined;
  pressure: number | undefined;
  humidity: number | undefined;
  direction: string | undefined;
  isLoading: boolean;
}

export const WeatherAdditionalInfo: FC<Props> = ({
  windSpeed,
  pressure,
  humidity,
  direction,
  isLoading
}) => (
  <div className="flex gap-2 justify-between flex-wrap mt-12">
    {!isLoading ? (
      <>
        <div className="flex flex-col basis-[calc(50%-10px)] md:basis-[calc(25%-10px)]">
          <span className="opacity-60 md:text-lg">Ветер</span>
          <span className="text-lg md:text-2xl mt-10px">
            {windSpeed} м/c, {direction}
          </span>
        </div>
        <div className="flex flex-col basis-[calc(50%-10px)] md:basis-[calc(25%-10px)]">
          <span className="opacity-60 md:text-lg">Давление</span>
          <span className="text-lg md:text-2xl mt-10px">{pressure} мм рт. ст.</span>
        </div>
        <div className="flex flex-col basis-[calc(50%-10px)] md:basis-[calc(25%-10px)]">
          <span className="opacity-60 md:text-lg">Влажность</span>
          <span className="text-lg md:text-2xl mt-10px">{humidity}%</span>
        </div>
        <div className="flex flex-col basis-[calc(50%-10px)] md:basis-[calc(25%-10px)]">
          <span className="opacity-60 md:text-lg">Вероятность дождя</span>
          <span className="text-lg md:text-2xl mt-10px">10%</span>
        </div>
      </>
    ) : (
      <AdditionalInfoSkeleton />
    )}
  </div>
);
