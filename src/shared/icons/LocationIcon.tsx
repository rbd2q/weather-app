import { FC } from 'react';

interface Props {
  size?: number;
}

export const LocationIcon: FC<Props> = ({ size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.489 5.83819L5.23895 16.6268L13.728 18.2769L18.2146 25.7637L22.489 5.83819Z"
      fill="white"
      fillOpacity="0.4"
    />
  </svg>
);
