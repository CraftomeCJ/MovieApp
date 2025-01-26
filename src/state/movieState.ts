import { atom, selector } from 'recoil';
import { Movie } from '../types/movie-type';
import { AsyncStorage } from 'react-native';

interface MoviesState {
  upcoming: Movie[];
  popular: Movie[];
}

export const moviesState = atom<MoviesState>({
  key: 'moviesState',
  default: { upcoming: [], popular: [] },
});

export const favoritesState = atom<number[]>({
  key: 'favoritesState',
  default: selector({
    key: 'favoritesState/initial',
    get: async () => {
      const data = await AsyncStorage.getItem('favorites');
      return data ? JSON.parse(data) : [];
    },
  }),
});