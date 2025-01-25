import axios from 'axios';
import Config from 'react-native-config';
import { Movie, MovieDetails } from '../types/type';

const API_KEY = Config.TMDB_API_KEY; // Access API key from .env
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};