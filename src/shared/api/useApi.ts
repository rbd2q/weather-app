import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'https://api.openweathermap.org',
  headers: {
    Accept: 'application/json'
  }
};

export const useApi = () => axios.create(config);
