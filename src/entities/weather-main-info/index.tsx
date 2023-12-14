import { FC } from 'react';

import { MainInfoSkeleton } from '@/shared/components/skeletons/main-info-skeleton';

interface Props {
  icon: string | undefined;
  temperature: number | undefined;
  description: string | undefined;
  isLoading: boolean;
}

export const WeatherMainInfo: FC<Props> = ({ icon, temperature, description, isLoading }) => (
  <div className="flex flex-col items-center text-white">
    {!isLoading ? (
      <>
        <span className="flex items-center">
          <img
            className="w-[120px] h-[120px] md:w-[200px] md:h-[200px]"
            src={icon}
            alt="weather icon"
          />
          <span className="text-7xl md:text-[180px]">{temperature}º</span>
        </span>
        <span className="text-lg md:text-2xl">{description}</span>
      </>
    ) : (
      <MainInfoSkeleton />
    )}
  </div>
);
