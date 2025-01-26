import React from 'react';
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useGetMovieDetails } from '../../hooks/useGetMovieDetails';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Genre } from '../types/movie-type';

type MovieDetailScreenRouteProp = RouteProp<
	RootStackParamList,
	'MOVIE_DETAILS'
>;

interface MovieDetailProps {
	route: MovieDetailScreenRouteProp;
	navigation: StackNavigationProp<
		RootStackParamList,
		'MOVIE_DETAILS'
	>;
}

const MovieDetailScreen: React.FC<MovieDetailProps> = ({
	route,
}) => {
	const { movieId } = route.params;
	const {
		movieDetails,
		loading,
		error,
		isFavorite,
		toggleFavorite,
	} = useGetMovieDetails(movieId);

	if (loading || !movieDetails) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.center}>
				<Text style={styles.error}>Error: {error.message}</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={{
					uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
				}}
				style={styles.poster}
			/>

			<View style={styles.header}>
				<Text style={styles.title}>{movieDetails.title}</Text>
				<TouchableOpacity onPress={toggleFavorite}>
					<Icon
						name={isFavorite ? 'favorite' : 'favorite-border'}
						size={28}
						color='#FF3B30'
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.detailRow}>
				<Text style={styles.label}>Release Date:</Text>
				<Text>
					{new Date(movieDetails.release_date).toLocaleDateString()}
				</Text>
			</View>

			<View style={styles.detailRow}>
				<Text style={styles.label}>Runtime:</Text>
				<Text>{movieDetails.runtime} minutes</Text>
			</View>

			<View style={styles.detailRow}>
				<Text style={styles.label}>Rating:</Text>
				<Text>{movieDetails.vote_average}/10</Text>
			</View>

			<Text style={styles.overview}>{movieDetails.overview}</Text>

			<Text style={styles.sectionTitle}>Genres</Text>
			<View style={styles.genres}>
				{movieDetails.genres.map((genre: Genre) => (
					<Text
						key={genre.id}
						style={styles.genre}
					>
						{genre.name}
					</Text>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		color: 'red',
	},
	poster: {
		width: '100%',
		height: 400,
		borderRadius: 8,
		marginBottom: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		flex: 1,
	},
	detailRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	label: {
		fontWeight: '600',
		marginRight: 8,
	},
	overview: {
		fontSize: 16,
		lineHeight: 24,
		marginVertical: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	genres: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	genre: {
		backgroundColor: '#e0e0e0',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
});

export default MovieDetailScreen;
