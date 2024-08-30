import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./slices/brandSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    brand: brandReducer,
    users: userReducer,
  },
});
