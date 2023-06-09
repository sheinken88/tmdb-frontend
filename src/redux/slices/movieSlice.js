import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieDetails: null,
  similarMovies: [],
  popularMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  movieActors: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    appendPopularMovies: (state, action) => {
      const existingIds = new Set(state.popularMovies.map((movie) => movie.id));
      const newMovies = action.payload.filter(
        (movie) => !existingIds.has(movie.id)
      );
      state.popularMovies = [...state.popularMovies, ...newMovies];
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    appendTopRatedMovies: (state, action) => {
      const existingIds = new Set(
        state.topRatedMovies.map((movie) => movie.id)
      );
      const newMovies = action.payload.filter(
        (movie) => !existingIds.has(movie.id)
      );
      state.topRatedMovies = [...state.topRatedMovies, ...newMovies];
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    appendUpcomingMovies: (state, action) => {
      const existingIds = new Set(
        state.upcomingMovies.map((movie) => movie.id)
      );
      const newMovies = action.payload.filter(
        (movie) => !existingIds.has(movie.id)
      );
      state.upcomingMovies = [...state.upcomingMovies, ...newMovies];
    },
    setMovieActors: (state, action) => {
      state.movieActors = action.payload;
    },
  },
});

export const {
  setMovieDetails,
  setSimilarMovies,
  setPopularMovies,
  appendPopularMovies,
  setTopRatedMovies,
  appendTopRatedMovies,
  setUpcomingMovies,
  appendUpcomingMovies,
  setMovieActors,
} = movieSlice.actions;

export default movieSlice.reducer;
