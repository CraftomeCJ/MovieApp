import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	fetchUpcomingMovies,
	fetchPopularMovies,
} from '../src/api/movieService';
import { moviesState } from '../src/state/movieState';

export const useMovies = () => {
	const [movies, setMovies] = useRecoilState(moviesState);
	const CACHE_KEY = 'movies_cache';

	const loadMovies = async () => {
		try {
			// Offline-first: Load cached data first
			const cachedData = await AsyncStorage.getItem(CACHE_KEY);
			if (cachedData) setMovies(JSON.parse(cachedData));

			// Fetch fresh data
			const [upcoming, popular] = await Promise.all([
				fetchUpcomingMovies(),
				fetchPopularMovies(),
			]);

			const mergedMovies = { upcoming, popular };
			setMovies(mergedMovies);
			await AsyncStorage.setItem(
				CACHE_KEY,
				JSON.stringify(mergedMovies),
			);
		} catch (error) {
			console.error('Failed to load movies:', error);
			throw error;
		}
	};

	useEffect(() => {
		loadMovies();
	}, []);

	return { movies, refresh: loadMovies };
};
