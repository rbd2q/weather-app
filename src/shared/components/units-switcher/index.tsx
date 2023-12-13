import { FC } from 'react';

import { UnitsType } from '@/shared/types';

interface Props {
  activeUnits: UnitsType;
  onChangeUnits: (unit: UnitsType) => void;
  isLoading?: boolean;
}

export const UnitsSwitcher: FC<Props> = ({ activeUnits, onChangeUnits, isLoading }) => (
  <div className="flex wrap-nowrap text-xl text-white">
    <span className="mr-2">º</span>
    <button
      disabled={isLoading}
      className={`border border-white opacity-40 rounded-l-lg px-2 py-1 ${
        activeUnits === 'metric' ? 'bg-white opacity-100 bg-opacity-20' : 'hover:opacity-80'
      }`}
      onClick={() => onChangeUnits('metric')}>
      C
    </button>
    <button
      disabled={isLoading}
      className={`border border-white opacity-40 rounded-r-lg px-2 py-1 hover:opacity-80 ${
        activeUnits === 'imperial' ? 'bg-white opacity-100 bg-opacity-20' : 'hover:opacity-80'
      }`}
      onClick={() => onChangeUnits('imperial')}>
      F
    </button>
  </div>
);
