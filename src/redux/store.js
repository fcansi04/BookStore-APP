import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

export default store = configureStore({
  reducer: {
    user: userReducer,
  },
});
