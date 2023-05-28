import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, register, logout , addToFavorites, removeFromFavorites } from './userSlice';

axios.defaults.withCredentials = true;

export const axiosURL = process.env.REACT_APP_AXIOS_URL;

export const userLogin = (email, password) => async (dispatch) => {
    try {
        await axios.post(`${axiosURL}/users/login`, {
            email,
            password
        })

        const payload = await axios.get(`${axiosURL}/users/secret`)

        const userData = payload.data
        await dispatch(login(userData))

    } catch (error) {
        console.error("login error: ", error)
    }
}

export const userRegister = (userName, email, password) => async (dispatch) => {
    try {
        const response =  await axios.post(`${axiosURL}/users/signup`, {
            userName,
            email,
            password
        })

        const userData = response.data
        dispatch(register(userData))

    } catch (error) {
        console.error("signup error: ", error)
    }
}

export const userLogout = () => async (dispatch) => {
  try {
        await axios.post(`${axiosURL}/users/logout`)

        dispatch(logout())
  } catch (error) {
    console.error("Logout error: ", error)
  }
}

export const addMovieToFavorites = (movieId) => async (dispatch, getState) => {
  const { user } = getState();
  try {
    const response = await axios.put(`${axiosURL}/users/${user.userData.id}/addFavorite`, { movieId });
    const { data } = response;
    dispatch(addToFavorites(data));

  } catch (error) {
    console.error("Add to fav: ", error)
  }
}

// export const addMovieToFavorites = createAsyncThunk(
//   'users/addToFavorites',
//   async (movieId, { dispatch, getState }) => {
//     const { user } = getState();
//     try {
//       const response = await axios.put(`/api/users/${user.userData.id}/addFavorite`, { movieId });
//       const { data } = response;
//       dispatch(addToFavorites(data));
//     } catch (error) {
//       throw Error(error);
//     }
//   }
// );

export const removeMovieFromFavorites = createAsyncThunk(
  'users/removeFromFavorites',
  async (movieId, { dispatch, getState }) => {
    const { user } = getState();
    try {
      const response = await axios.put(`/api/users/${user.userData.id}/removeFavorite`, { movieId });
      const { data } = response;
      dispatch(removeFromFavorites(data));
    } catch (error) {
      throw Error(error);
    }
  }
);
