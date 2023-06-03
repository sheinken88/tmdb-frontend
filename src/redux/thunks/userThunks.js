import axios from 'axios';
import { login, register, logout , addToFavorites, removeFromFavorites } from '../slices/userSlice';
import * as settings from "../../settings"

axios.defaults.withCredentials = true;


export const userLogin = (email, password) => async (dispatch) => {
  try {
      await axios.post(`${settings.axiosURL}/users/login`, {
          email,
          password
      })

      const payload = await axios.get(`${settings.axiosURL}/users/me`)

      const userData = payload.data
      await dispatch(login(userData))

  } catch (error) {
      console.error("login error: ", error)
  }
}

export const userRegister = (userName, email, password) => async (dispatch) => {
  try {
        await axios.post(`${settings.axiosURL}/users/signup`, {
          userName,
          email,
          password
      })

      const payload = await axios.get(`${settings.axiosURL}/users/me`)

      const userData = payload.data
      dispatch(register(userData))

  } catch (error) {
      console.error("signup error: ", error)
  }
}


export const userLogout = () => async (dispatch) => {
  try {
        await axios.post(`${settings.axiosURL}/users/logout`)

        dispatch(logout())
  } catch (error) {
    console.error("Logout error: ", error)
  }
}

export const addMovieToFavorites = (movieId) => async (dispatch, getState) => {
  const { user } = getState();
  try {
    const response = await axios.put(`${settings.axiosURL}/users/${user.userData.id}/addFavorite`, { movieId });
    const { data } = response;

    dispatch(addToFavorites(data));

  } catch (error) {
    console.error("Add to fav: ", error)
  }
}


export const removeMovieFromFavorites = (movieId) => async (dispatch, getState) => {
  const { user } = getState();
  try {
    const response = await axios.put(`${settings.axiosURL}/users/${user.userData.id}/removeFavorite`, { movieId });
    const { data } = response;
    dispatch(removeFromFavorites(data));
  } catch (error) {
    console.error("Remove from fav: ", error);
  }
}

