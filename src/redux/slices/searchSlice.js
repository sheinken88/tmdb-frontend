import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    startSearch: (state) => {
      state.isLoading = true;
      state.error = null;
      state.searchResults = [];
    },
    searchSuccess: (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    searchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { startSearch, searchSuccess, searchFailure } = searchSlice.actions;

export default searchSlice.reducer;
