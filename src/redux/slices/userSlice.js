import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  favorites: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.favorites = action.payload.favorites || [];
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.favorites = [];
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    removeFromFavorites: (state, action) => {
      state.favorites = [
        ...state.favorites.filter((movie) => movie.id !== action.payload.id),
      ];
    },
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingEnd: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  login,
  loginError,
  clearError,
  logout,
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
  loadingStart,
  loadingEnd,
} = userSlice.actions;
export default userSlice.reducer;
