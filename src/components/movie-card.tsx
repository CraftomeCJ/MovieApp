import React from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native';
import type { Movie } from '../types/movie-type';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
	movie,
	isFavorite,
	onToggleFavorite,
}) => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={() =>
				navigation.navigate('MOVIE_DETAILS', { movieId: movie.id })
			}
		>
			<Image
				source={{
					uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
				}}
				style={styles.poster}
				resizeMode='cover'
			/>
			<View style={styles.info}>
				<Text
					style={styles.title}
					numberOfLines={2}
				>
					{movie.title}
				</Text>
				<Text style={styles.date}>
					{new Date(movie.release_date).getFullYear()}
				</Text>
			</View>
			<TouchableOpacity
				onPress={onToggleFavorite}
				style={styles.favoriteButton}
			>
				<Text style={styles.favoriteIcon}>
					{isFavorite ? '❤️' : '🤍'}
				</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 150,
		marginRight: 16,
		backgroundColor: '#fff',
		borderRadius: 8,
		overflow: 'hidden',
		elevation: 2,
	},
	poster: {
		width: '100%',
		height: 200,
	},
	info: {
		padding: 8,
	},
	title: {
		fontWeight: '600',
		fontSize: 14,
	},
	date: {
		fontSize: 12,
		color: '#666',
	},
	favoriteButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderRadius: 16,
		padding: 4,
	},
	favoriteIcon: {
		fontSize: 20,
	},
});

export default MovieCard;
