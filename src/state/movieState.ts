import { atom, selector } from 'recoil';

export const moviesState = atom({
  key: 'moviesState',
  default: [],
});

export const favoritesState = atom({
  key: 'favoritesState',
  default: [],
});