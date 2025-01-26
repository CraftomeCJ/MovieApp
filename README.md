# Movie App - React Native

A React Native application that fetches and displays upcoming and popular movies from the TMDB API. The app supports offline functionality, dependency injection, and reactive programming principles.

---

## Features

- **Offline Support**: Caches movie data locally and displays it when offline.
- **Dependency Injection**: Decoupled API service layer for better testability.
- **Reactive Programming**: Uses Recoil for state management and React hooks for reactive updates.
- **Clean Architecture**: Modular code structure with reusable components and hooks.
- **Navigation**: Stack navigation for seamless screen transitions.
- **Favorites**: Allows users to toggle movies as favorites, persisted locally.

---

## Objectives Met

| Objective                  | Status  | Implementation Details |
|----------------------------|---------|------------------------|
| **Offline Support**        | ✅       | - Caching with `AsyncStorage`.<br>- Network detection using `NetInfo`.<br>- Graceful degradation for offline mode. |
| **Dependency Injection**   | ✅       | - API service layer (`movieService.ts`).<br>- Decoupled logic from components. |
| **Reactive Programming**   | ✅       | - Recoil for global state management.<br>- React hooks for reactive updates. |
| **Clean Code**             | ✅       | - Modular components and hooks.<br>- TypeScript for type safety. |
| **Navigation**             | ✅       | - Stack navigation for screen transitions. |
| **Favorites**              | ✅       | - Toggle favorites with local persistence. |

---

## File Structure

```
src/
├── api/               # API service layer
├── components/        # Reusable UI components
├── hooks/             # Custom hooks
├── navigation/        # React Navigation setup
├── screens/           # Screen components
├── state/             # Recoil state management
├── types/             # TypeScript types
├── utils/             # Utility functions
```

---

## Key Files

### 1. **API Service Layer** (`movieService.ts`)
- **Description**: Handles all API calls to TMDB.
- **Key Features**:
  - Fetch upcoming, popular, and movie details.
  - Error handling with detailed logging.
- **Example**:
  ```typescript
  export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    return response.data.results;
  };
  ```

### 2. **Custom Hooks** (`useMovies.ts`, `useGetMovieDetails.ts`)
- **Description**: Encapsulate data fetching and state management logic.
- **Key Features**:
  - Offline-first approach with caching.
  - Network detection using `NetInfo`.
  - Recoil for global state management.
- **Example**:
  ```typescript
  const loadMovies = async () => {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedData) setMovies(JSON.parse(cachedData));
  };
  ```

### 3. **State Management** (`movieState.ts`)
- **Description**: Manages global state using Recoil.
- **Key Features**:
  - `moviesState`: Stores upcoming and popular movies.
  - `favoritesState`: Stores user's favorite movies.
- **Example**:
  ```typescript
  export const favoritesState = atom<number[]>({
    key: 'favoritesState',
    default: selector({
      get: async () => {
        const data = await AsyncStorage.getItem('favorites');
        return data ? JSON.parse(data) : [];
      },
    }),
  });
  ```

### 4. **Screens** (`home-screen.tsx`, `detail-screen.tsx`)
- **Description**: Main UI components for displaying movies and details.
- **Key Features**:
  - Display lists of upcoming and popular movies.
  - Show movie details with genres, runtime, and rating.
  - Toggle favorites with local persistence.
- **Example**:
  ```typescript
  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };
  ```

### 5. **Navigation** (`AppNavigator.tsx`)
- **Description**: Handles screen transitions using React Navigation.
- **Key Features**:
  - Stack navigation for `HomeScreen` and `MovieDetailScreen`.
- **Example**:
  ```typescript
  const Stack = createStackNavigator<RootStackParamList>();
  const AppNavigator = () => (
    <Stack.Navigator initialRouteName="HOME">
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="MOVIE_DETAILS" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
  ```

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/MovieApp.git
   cd movie-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run android
   ```

---

## Testing [[WIP]]

### Unit Tests
- **Hooks**: Test custom hooks like `useMovies` and `useGetMovieDetails`.
- **Components**: Test UI components like `MovieCard`.

### Integration Tests
- **Navigation**: Test screen transitions.
- **State Management**: Test Recoil state updates.

Run tests with:
```bash
npm test
```

---

## Technologies Used

- **React Native**: For building the mobile app.
- **Recoil**: For state management.
- **React Navigation**: For screen transitions.
- **Axios**: For API requests.
- **AsyncStorage**: For local data persistence.
- **TypeScript**: For type safety.

---

## Future Improvements

1. **Advanced Caching**: Use `redis` for better caching.
2. **Unit Tests**: Add more test coverage for hooks and components.
3. **UI Enhancements**: Improve UI/UX with animations and better layouts.
4. **Error Handling**: Add retry mechanisms for failed API calls.

---
