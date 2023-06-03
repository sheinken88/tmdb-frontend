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
    // register: (state, action) => {
    //   // state.isAuthenticated = true;
    //   // state.userData = action.payload;
    // },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.favorites = [];
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
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
  // register,
  addToFavorites,
  removeFromFavorites,
} = userSlice.actions;
export default userSlice.reducer;
