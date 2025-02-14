import axios from 'axios';
import { MAIN_API } from './const';
import TokenService from '../services/token.service';


// Create an Axios instance with custom configuration, if needed
export const axiosInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': TokenService.getToken() ?`Bearer ${TokenService.getToken()}` : ''
    // Add any custom headers you need here
  },
});

export const axiosFileInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  headers: {
    "Content-Type": "multipart/form-data",
    'Authorization': TokenService.getToken() ?`Bearer ${TokenService.getToken()}` : ''
    // Add any custom headers you need here
  },
});


export const axiosNoTokenInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers you need here
  },
});


axiosInstance.interceptors.request.use(async (config) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 2-second delay
  return config;
}, (error) => {
  return Promise.reject(error);
});

