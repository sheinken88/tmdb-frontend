import axios from "axios";
import {
  login,
  logout,
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
} from "../slices/userSlice";

axios.defaults.withCredentials = true;

export const userLogin = (email, password) => async (dispatch) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
      email,
      password,
    });

    const payload = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`);

    const userData = payload.data;

    await dispatch(login(userData));
    await dispatch(clearError());
  } catch (error) {
    console.error("login error: ", error);
    throw new Error("Incorrect email or password. Please try again.");
  }
};

export const userRegister = (userName, email, password) => async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, {
      userName,
      email,
      password,
    });
  } catch (error) {
    console.error("signup error: ", error);
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);

    dispatch(logout());
  } catch (error) {
    console.error("Logout error: ", error);
  }
};

export const addMovieToFavorites = (movieId) => async (dispatch, getState) => {
  const { user } = getState();
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${user.userData.id}/addFavorite`,
      { movieId: parseInt(movieId) }
    );

    const { data } = response;

    dispatch(addToFavorites(data));
  } catch (error) {
    console.error("Add to fav: ", error);
  }
};

export const removeMovieFromFavorites =
  (movieId) => async (dispatch, getState) => {
    const { user } = getState();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${
          user.userData.id
        }/removeFavorite`,
        { movieId }
      );
      const { data } = response;

      dispatch(loadFavorites(data));
    } catch (error) {
      console.error("Remove from fav: ", error);
    }
  };

export const fetchFavorites = () => async (dispatch, getState) => {
  const { user } = getState();
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${user.userData.id}/favorites`
    );
    const { data } = response;
    dispatch(loadFavorites(data));
  } catch (error) {
    console.error("Fetch favorite movies: ", error);
  }
};
