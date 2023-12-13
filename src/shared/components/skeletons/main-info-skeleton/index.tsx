import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const MainInfoSkeleton: FC = () => (
  <ContentLoader
    className="flex justify-center"
    backgroundColor="#f6f6f6"
    foregroundColor="#498CEC"
    speed={1}
    width="350"
    height="225"
    viewBox="0 0 350 225">
    <rect width="350" height="170" rx="20" />
    <rect x="92" y="185" width="165" height="40" rx="5" />
  </ContentLoader>
);
