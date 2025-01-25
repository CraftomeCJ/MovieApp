import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Movie } from '../types/movie-type';


interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
        <Text>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16, alignItems: 'center' },
  poster: { width: 150, height: 200, borderRadius: 8 },
  title: { fontSize: 16, marginTop: 8 },
  favoriteButton: { marginTop: 8 },
});

export default MovieCard;