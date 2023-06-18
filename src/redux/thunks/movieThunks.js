import axios from "axios";
import {
  setMovieDetails,
  setPopularMovies,
  setUpcomingMovies,
  setTopRatedMovies,
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

export const fetchPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${settings.axiosURL}/movies/popular`);
    dispatch(setPopularMovies(response.data.results));
  } catch (error) {
    console.error("Fetch popular movies: ", error);
  }
};

export const fetchTopRatedMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${settings.axiosURL}/movies/top_rated`);
    dispatch(setTopRatedMovies(response.data.results));
  } catch (error) {
    console.error("Fetch top-rated movies: ", error);
  }
};

export const fetchUpcomingMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${settings.axiosURL}/movies/upcoming`);
    dispatch(setUpcomingMovies(response.data.results));
  } catch (error) {
    console.error("Fetch upcoming movies: ", error);
  }
};
