import { Movie, MovieDetails } from '../types/movie-type';
import {
  axiosInstance,
  handleError,
  fetchMoviesData,
} from '../utils/api-utils';

// Fetch upcoming movies
export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const data = await fetchMoviesData<{ results: Movie[] }>('/movie/upcoming');
  return data.results;
};

// Fetch popular movies
export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const data = await fetchMoviesData<{ results: Movie[] }>('/movie/popular');
  return data.results;
};

// Fetch movie details by ID
export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  return fetchMoviesData<MovieDetails>(`/movie/${id}`);
};
