import axios, { CreateAxiosDefaults } from 'axios';

const config: CreateAxiosDefaults = {
  headers: {
    Accept: 'application/json'
  }
};

export const useApi = () => {
  const actualConfig = {
    ...config,
    headers: {
      ...config.headers
    }
  };

  return axios.create(actualConfig);
};
