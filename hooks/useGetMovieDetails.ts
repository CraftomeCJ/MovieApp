import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { fetchMovieDetails } from '../src/api/movieService';
import { favoritesState } from '../src/state/movieState';
import { MovieDetails } from '../src/types/movie-type';

export const useGetMovieDetails = (movieId: number) => {
	const [movieDetails, setMovieDetails] =
		useState<MovieDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [favorites, setFavorites] = useRecoilState(favoritesState);

	const CACHE_KEY = `movie_details_${movieId}`;

	const loadDetails = async () => {
		try {
			// Check cache first
			const cachedData = await AsyncStorage.getItem(CACHE_KEY);
			if (cachedData) {
				setMovieDetails(JSON.parse(cachedData));
			}

			// Check network status FIRST
			const networkState = await NetInfo.fetch();
			const isConnected = networkState.isConnected ?? false;

			if (!isConnected) {
				setError(new Error('Offline - showing cached data'));
				return;
			}

			// Fetch fresh data
			const data = await fetchMovieDetails(movieId);
			setMovieDetails(data);
			await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	};

	const toggleFavorite = () => {
		setFavorites((prev: number[]) =>
			prev.includes(movieId)
				? prev.filter((id) => id !== movieId)
				: [...prev, movieId],
		);
	};

	useEffect(() => {
		loadDetails();
	}, [movieId]);

	useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

	return {
		movieDetails,
		loading,
		error,
		isFavorite: favorites.includes(movieId),
		toggleFavorite,
		refresh: loadDetails,
	};
};
