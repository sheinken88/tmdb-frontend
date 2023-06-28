import axios from "axios";
import {
  setMovieDetails,
  setSimilarMovies,
  setPopularMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  appendPopularMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,
  setMovieActors,
} from "../slices/movieSlice";

axios.defaults.withCredentials = true;

export const fetchMovieDetails = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/${movieId}`
    );
    dispatch(setMovieDetails(response.data.movieDetails));
    dispatch(setSimilarMovies(response.data.similarMovies.results));
  } catch (error) {
    console.error("Fetch movie details: ", error);
    console.error("Error message: ", error.message);
    console.error("Error response: ", error.response);
  }
};

export const fetchMovieActors = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/${movieId}/credits`
    );
    dispatch(setMovieActors(response.data));
  } catch (error) {
    console.error("Fetch movie actors: ", error);
    console.error("Error message: ", error.message);
    console.error("Error response: ", error.response);
  }
};

export const fetchPopularMovies =
  (page = 1) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/popular?page=${page}`
      );
      if (page === 1) {
        dispatch(setPopularMovies(response.data.results));
      } else {
        dispatch(appendPopularMovies(response.data.results));
      }
    } catch (error) {
      console.error("Fetch popular movies: ", error);
    }
  };

export const fetchTopRatedMovies =
  (page = 1) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/top_rated?page=${page}`
      );
      if (page === 1) {
        dispatch(setTopRatedMovies(response.data.results));
      } else {
        dispatch(appendTopRatedMovies(response.data.results));
      }
    } catch (error) {
      console.error("Fetch top-rated movies: ", error);
    }
  };

export const fetchUpcomingMovies =
  (page = 1) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/upcoming?page=${page}`
      );
      if (page === 1) {
        dispatch(setUpcomingMovies(response.data.results));
      } else {
        dispatch(appendUpcomingMovies(response.data.results));
      }
    } catch (error) {
      console.error("Fetch upcoming movies: ", error);
    }
  };
