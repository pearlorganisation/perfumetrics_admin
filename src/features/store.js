import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./slices/brandSlice";

export default configureStore({
  reducer: {
    brand: brandReducer,
  },
});
