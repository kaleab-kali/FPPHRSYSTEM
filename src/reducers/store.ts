import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    // other reducers if any
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
