import axios from 'axios';
import { Movie, MovieDetails } from '../types/movie-type';

const API_KEY = '77545170d233541d9c56f99a85dcc14c';
const BASE_URL = 'https://api.themoviedb.org/3';

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
