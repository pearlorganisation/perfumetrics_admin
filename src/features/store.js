import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./slices/brandSlice";
import userReducer from "./slices/userSlice";
import {encryptTransform} from "redux-persist-transform-encrypt";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';





const encryptor = encryptTransform({
  secretKey: `${import.meta.env.REDUX_PERSIST_SECRET_KEY}`,

  
  onError:(err)=>{
    console.log("Redux Persist Encryption Failed", err);
  },
});

const persistConfig = {
  key: "root",
  version:1 ,
  storage,
  transforms:[encryptor],
};

const persistedBrandReducer = persistReducer(persistConfig, brandReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

console.log(import.meta.env.REDUX_PERSIST_SECRET_KEY, "kjqle")

// export default configureStore({
//   reducer: {
//     brand: brandReducer,
//     users: userReducer,
//   },
// });
const store = configureStore({
  reducer: {
    brand: persistedBrandReducer,
    users: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
export default store;

