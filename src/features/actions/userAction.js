import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching perfume brands from an API
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth`);
    console.log(response.data, "response.data");
    return response.data?.data;
  }
);
