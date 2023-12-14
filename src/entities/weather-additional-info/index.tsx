import { FC } from 'react';

import { AdditionalInfoSkeleton } from '@/shared/components/skeletons/additional-info-skeleton';

interface Props {
  windSpeed: number | undefined;
  windDirection: string | undefined;
  pressure: number | undefined;
  humidity: number | undefined;
  rainProbability: number | undefined;
  isLoading: boolean;
}

export const WeatherAdditionalInfo: FC<Props> = ({
  windSpeed,
  windDirection,
  pressure,
  humidity,
  rainProbability,
  isLoading
}) => (
  <div className="flex gap-2 justify-between flex-wrap mt-12">
    {!isLoading ? (
      <>
        <div className="flex flex-col basis-[calc(50%-8px)] md:basis-[calc(25%-8px)]">
          <span className="opacity-60 md:text-lg">Ветер</span>
          <span className="text-lg md:text-2xl mt-10px">
            {windSpeed} м/c, {windDirection}
          </span>
        </div>
        <div className="flex flex-col basis-[calc(50%-8px)] md:basis-[calc(25%-8px)]">
          <span className="opacity-60 md:text-lg">Давление</span>
          <span className="text-lg md:text-2xl mt-10px">{pressure} мм рт. ст.</span>
        </div>
        <div className="flex flex-col basis-[calc(50%-8px)] md:basis-[calc(25%-8px)]">
          <span className="opacity-60 md:text-lg">Влажность</span>
          <span className="text-lg md:text-2xl mt-10px">{humidity}%</span>
        </div>
        <div className="flex flex-col basis-[calc(50%-8px)] md:basis-[calc(25%-8px)]">
          <span className="opacity-60 md:text-lg">Вероятность дождя</span>
          <span className="text-lg md:text-2xl mt-10px">{rainProbability}%</span>
        </div>
      </>
    ) : (
      <AdditionalInfoSkeleton />
    )}
  </div>
);
