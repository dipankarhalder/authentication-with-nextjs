import axios, { AxiosInstance } from 'axios';

export const httpAxios: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});