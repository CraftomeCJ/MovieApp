import axios from 'axios';
import Config from 'react-native-config';
import { Movie, MovieDetails } from '../types/movie-type';

// const API_KEY = Config.TMDB_API_KEY; // Access from .env
const API_KEY = '77545170d233541d9c56f99a85dcc14c';
// const BASE_URL = process.env['TMDB_BASE_URL']
const BASE_URL = 'https://api.themoviedb.org/3';

console.log('TMDB_API_KEY:', Config.TMDB_API_KEY);
console.log('TMDB_BASE_URL:', Config.TMDB_BASE_URL);

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
	try {
		const response = await axios.get(
			`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
		);
		return response.data.results;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('API Error [Upcoming]:', {
				url: `${BASE_URL}/movie/upcoming`,
				status: error.response?.status,
				message: error.message,
				config: error.config,
			});
		} else {
			console.error('Unexpected Error:', error);
		}
		throw error;
	}
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
	try {
		const response = await axios.get(
			`${BASE_URL}/movie/popular?api_key=${API_KEY}`,
		);
		return response.data.results;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('API Error [Popular]:', {
				url: `${BASE_URL}/movie/popular`,
				status: error.response?.status,
				message: error.message,
				config: error.config,
			});
		} else {
			console.error('Unexpected Error:', error);
		}
		throw error;
	}
};

export const fetchMovieDetails = async (
	id: number,
): Promise<MovieDetails> => {
	try {
		const response = await axios.get(
			`${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('API Error [Details]:', {
				url: `${BASE_URL}/movie/${id}`,
				status: error.response?.status,
				message: error.message,
				config: error.config,
			});
		} else {
			console.error('Unexpected Error:', error);
		}
		throw error;
	}
};
