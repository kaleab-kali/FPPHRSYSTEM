"use client";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./features/employeeSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
