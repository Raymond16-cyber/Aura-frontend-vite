import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./reducers/auth";
import { waitlistReducer } from "./reducers/waitlistReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  waitlist: waitlistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
