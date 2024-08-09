import { createSlice } from "@reduxjs/toolkit";
import {
  addBrands,
  deleteBrands,
  fetchBrands,
  updateBrands,
} from "../actions/brandsAction";

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    isDeleted: false,
    isUpdated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Define other reducers if needed (e.g., addBrand, updateBrand, deleteBrand)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.isUpdated = false;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload; // Assuming the API returns an array of brands
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // add brands
      .addCase(addBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload; // Assuming the API returns an array of brands
      })
      .addCase(addBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // delete brands
      .addCase(deleteBrands.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.brands = action.payload; // Assuming the API returns an array of brands
      })
      .addCase(deleteBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // update brands
      .addCase(updateBrands.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.brands = action.payload; // Assuming the API returns an array of brands
      })
      .addCase(updateBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;
