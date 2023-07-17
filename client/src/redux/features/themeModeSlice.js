import { createSlice } from "@reduxjs/toolkit";

// Create a slice of store for managing themeMode state.
export const themeModeSlice = createSlice({
  // The name of the slice.
  name: "ThemeMode",

  // The initial state of the slice.
  initialState: {
    themeMode: "dark",
  },
  // Define an object, containing functions that handle the actions corresponding to the slice.
  reducers: {
    // Sets the themeMode state to the payload value of the action.
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer; // Be used in managing the Redux store.
