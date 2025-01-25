import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
import { moviesState, favoritesState } from '../state/movieState';
import MovieCard from '../components/movie-card';
import type { Movie } from '../types/movie-type';
import { useMovies } from '../../hooks/useGetMovies';
import withApiState from '../../helpers/with-api-state';

const HomeScreen: React.FC = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const { movies, refresh } = useMovies();

  const toggleFavorite = (movieId: number) => {
    setFavorites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const renderSection = (title: string, data: Movie[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSection('Upcoming Movies', movies.upcoming)}
      {renderSection('Popular Movies', movies.popular)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: { marginVertical: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  listContent: { paddingHorizontal: 16 },
});

// Wrap with API state HOC
export default withApiState(HomeScreen);