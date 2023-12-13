import { FC } from 'react';

import { LocationBlock } from '@/entities/location-block';
import { UnitsSwitcher } from '@/shared/components/units-switcher';
import { UnitsType } from '@/shared/types';

interface Props {
  city: string | undefined;
  units: UnitsType;
  onFormSubmit: (city: string) => void;
  onChangeUnits: (value: UnitsType) => void;
  handleGetMyLocation: () => void;
  isLoading: boolean;
}

export const WeatherControllers: FC<Props> = ({
  city,
  onFormSubmit,
  units,
  onChangeUnits,
  handleGetMyLocation,
  isLoading
}) => (
  <div className="flex justify-between items-start md:items-center">
    <LocationBlock
      city={city}
      onFormSubmit={onFormSubmit}
      handleGetMyLocation={handleGetMyLocation}
      isLoading={isLoading}
    />
    <UnitsSwitcher activeUnits={units} onChangeUnits={onChangeUnits} />
  </div>
);
