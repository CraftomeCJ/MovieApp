import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
	fetchPopularMovies,
	fetchUpcomingMovies,
} from '../src/api/movieService';
import { moviesState } from '../src/state/movieState';

export const useMovies = () => {
	const [movies, setMovies] = useRecoilState(moviesState);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | string | null>(null);
	const CACHE_KEY = 'movies_cache';

	const loadMovies = async () => {
		setLoading(true);
		setError(null);
		try {
			// Offline-first: Load cached data first
			const cachedData = await AsyncStorage.getItem(CACHE_KEY);
			if (cachedData) setMovies(JSON.parse(cachedData));

			// Check network status FIRST
			const networkState = await NetInfo.fetch();
			const isConnected = networkState.isConnected ?? false;

			if (!isConnected) {
				setError(new Error('Offline - showing cached data'));
				return;
			}

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
			setError('Failed to load movies');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadMovies();
	}, []);

	return { movies, loading, error, refresh: loadMovies };
};
