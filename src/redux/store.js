import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import movieReducer from "./slices/movieSlice";
import searchReducer from "./slices/searchSlice";
import alertReducer from "./slices/alertSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    search: searchReducer,
    alert: alertReducer,
  },
});

export default store;
