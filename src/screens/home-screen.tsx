import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import { moviesState, favoritesState } from '../state/movieState';
import MovieCard from '../components/movie-card';
import type { Movie } from '../types/movie-type';
import { useMovies } from '../../hooks/useGetMovies';
import withApiState from '../../helpers/with-api-state';
import { ApiState } from '../types/api-types';

const HomeScreen: React.FC<ApiState> = ({ loading, error, refresh }) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const { movies } = useMovies();

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={refresh} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {renderSection('Upcoming Movies', movies.upcoming)}
      {renderSection('Popular Movies', movies.popular)}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { flex: 1, padding: 16 },
  section: { marginVertical: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  listContent: { paddingHorizontal: 16 },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default withApiState(HomeScreen);