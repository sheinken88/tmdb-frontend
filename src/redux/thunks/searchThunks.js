import axios from "axios";
import {
  startSearch,
  searchSuccess,
  searchFailure,
} from "../slices/searchSlice";

axios.defaults.withCredentials = true;

export const searchMovies = (query) => async (dispatch) => {
  dispatch(startSearch());

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/search?query=${query}`
    );
    dispatch(searchSuccess(response.data));
  } catch (error) {
    console.error("Search movies: ", error);
    dispatch(searchFailure(error.toString()));
  }
};
