import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const AdditionalInfoSkeleton: FC = () => (
  <ContentLoader
    backgroundColor="#b1c2ee"
    foregroundColor="#498CEC"
    speed={1}
    width="100%"
    height="60"
    viewBox="0 0 1200 60">
    <rect width="20%" height="60" rx="10" fill="#D9D9D9" />
    <rect x="300" width="20%" height="60" rx="10" fill="#D9D9D9" />
    <rect x="600" width="20%" height="60" rx="10" fill="#D9D9D9" />
    <rect x="900" width="20%" height="60" rx="10" fill="#D9D9D9" />
  </ContentLoader>
);
