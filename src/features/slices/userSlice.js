import { createSlice } from "@reduxjs/toolkit";

import { fetchAllUsers } from "../actions/userAction";

const userSlice = createSlice({
  name: "brands",
  initialState: {
    usersData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Define other reducers if needed (e.g., addBrand, updateBrand, deleteBrand)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersData = action.payload; // Assuming the API returns an array of brands
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
