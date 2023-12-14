import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastContainer } from '@/shared/components/toast';

import { WeatherPage } from './pages/weather-page';

const App = () => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <WeatherPage />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
