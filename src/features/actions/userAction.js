import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching perfume brands from an API
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async ({page,search}) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth?Page=${page||1}&Search=${search||''}`);
    console.log(response.data, "response.data");
    return response.data;
  }
);
