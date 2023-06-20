import axios from "axios";
import {
  setMovieDetails,
  setPopularMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  appendPopularMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,
} from "../slices/movieSlice";
import * as settings from "../../settings";
axios.defaults.withCredentials = true;

export const fetchMovieDetails = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(`${settings.axiosURL}/movies/${movieId}`);
    dispatch(setMovieDetails(response.data));
  } catch (error) {
    console.error("Fetch movie details: ", error);
  }
};

export const fetchPopularMovies =
  (page = 1) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${settings.axiosURL}/movies/popular?page=${page}`
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
        `${settings.axiosURL}/movies/top_rated?page=${page}`
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
        `${settings.axiosURL}/movies/upcoming?page=${page}`
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
