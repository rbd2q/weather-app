import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'https://api.openweathermap.org',
  headers: {
    Accept: 'application/json'
  }
};

export const useApi = () => {
  const actualConfig = { ...config, headers: { ...config.headers } };

  return axios.create(actualConfig);
};
