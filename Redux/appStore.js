import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
  },
});

export default appStore;
