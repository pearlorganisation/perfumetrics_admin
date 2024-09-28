import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching perfume brands from an API
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async ({page,search}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand?Page=${page||1}&Search=${search||''}`);
  console.log(response.data, "response.data");
  return response.data;
});

// Async thunk for add perfume brands from an API
export const addBrands = createAsyncThunk("brands/addBrands", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/brand`,
    data
  );
  return response?.data;
});

// Async thunk for delete perfume brands from an API
export const deleteBrands = createAsyncThunk(
  "brands/deleteBrands",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/brand/${id}`
    );
    console.log(response.data, "response.data");
    return response.data;
  }
);

// Async thunk for update perfume brands from an API
export const updateBrands = createAsyncThunk(
  "brands/updateBrands",
  async (data) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/brand/${data?.id}`,
      data?.data
    );
    console.log(response.data, "response.data");
    return response.data;
  }
);
