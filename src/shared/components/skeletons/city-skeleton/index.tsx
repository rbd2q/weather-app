import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const CitySkeleton: FC = () => (
  <ContentLoader
    backgroundColor="#f6f6f6"
    foregroundColor="#498CEC"
    speed={1}
    width="100%"
    height="75"
    viewBox="0 0 480 75">
    <rect width="60%" height="60" rx="8" />
  </ContentLoader>
);
