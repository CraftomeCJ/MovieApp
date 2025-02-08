import axios from 'axios';
import ENV from '../config/env';

// Base configuration for Axios
export const axiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
  params: { api_key: ENV.API_KEY },
});

// Generic error handler
export const handleError = (error: unknown, endpoint: string) => {
  if (axios.isAxiosError(error)) {
    console.error(`API Error [${endpoint}]:`, {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      config: error.config,
    });
  } else {
    console.error('Unexpected Error:', error);
  }
  throw error;
};

export const fetchMoviesData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error, endpoint);
    throw new Error('Failed to fetch data');
  }
};
