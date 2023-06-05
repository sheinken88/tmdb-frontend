import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
  searchActivated: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    startSearch: (state) => {
      state.isLoading = true;
      state.error = null;
      state.searchResults = [];
      state.searchActivated = true; 
    },
    searchSuccess: (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    searchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchActivated = false; 
    },
  },
});

export const { startSearch, searchSuccess, searchFailure, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
