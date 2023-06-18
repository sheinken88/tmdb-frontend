import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.favorites = action.payload.favorites;
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
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const {
  login,
  logout,
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
} = userSlice.actions;
export default userSlice.reducer;
