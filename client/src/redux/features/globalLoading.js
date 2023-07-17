import { createSlice } from "@reduxjs/toolkit";

// Create a slice of store for managing globalLoading state.
export const globalLoadingSlice = createSlice({
  // The name of the slice.
  name: "GlobalLoading",

  // The initial state of the slice.
  initialState: {
    globalLoading: false,
  },
  // Define an object, containing functions that handle the actions corresponding to the slice.
  reducers: {
    // Sets the globalLoading state to the payload value of the action.
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer; // Be used in managing the Redux store.
