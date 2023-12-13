import { WeatherPage } from './pages/weather-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRef } from 'react';

const App = () => {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false
        }
      }
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <div>
        <WeatherPage />
      </div>
    </QueryClientProvider>
  );
};

export default App;
