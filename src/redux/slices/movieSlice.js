import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieDetails: null,
  popularMovies: [],
  upcomingMovies: [],
  topRatedMovies: []
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
  },
});

export const {
  setMovieDetails,
  setPopularMovies,
  setUpcomingMovies,
  setTopRatedMovies
} = movieSlice.actions;
export default movieSlice.reducer;
