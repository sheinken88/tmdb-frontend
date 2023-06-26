import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  alertTitle: "",
  alertStatus: "info",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.showAlert = true;
      state.alertTitle = action.payload.title;
      state.alertStatus = action.payload.status;
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.alertTitle = "";
      state.alertStatus = "info";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
