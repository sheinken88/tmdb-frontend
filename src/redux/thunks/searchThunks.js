import axios from "axios";
import {
  startSearch,
  searchSuccess,
  searchFailure,
} from "../slices/searchSlice";
import * as settings from "../../settings";
axios.defaults.withCredentials = true;

export const searchMovies = (query) => async (dispatch) => {
  dispatch(startSearch());

  try {
    const response = await axios.get(
      `${settings.axiosURL}/search?query=${query}`
    );
    dispatch(searchSuccess(response.data));
  } catch (error) {
    console.error("Search movies: ", error);
    dispatch(searchFailure(error.toString()));
  }
};
