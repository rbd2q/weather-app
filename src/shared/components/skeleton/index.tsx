import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const CitySkeleton: FC = () => (
  <ContentLoader
    backgroundColor="#f6f6f6"
    foregroundColor="#989898"
    speed={1}
    width="100%"
    height="75"
    viewBox="0 0 480 50">
    <rect width="230" height="50" rx="8" />
  </ContentLoader>
);
