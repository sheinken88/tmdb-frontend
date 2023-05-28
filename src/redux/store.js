import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import movieReducer from './slices/movieSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    search: searchReducer,
  },
});

export default store;