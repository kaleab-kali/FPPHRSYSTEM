import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Employee } from '../../backend/utils/employeeInt';

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
  const response = await fetch('http://localhost:3001/employees');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
});

interface EmployeeState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  status: 'idle',
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchEmployees.rejected, (state, action) => {
        if (action.payload) {
          // Assuming you want to set the error message in the state
          state.error = action.payload.toString();
        } else {
          state.error = "Unknown error occurred";
        }
        state.status = 'failed';
      });
  },
});

export const selectEmployees = (state: RootState) => state.employee.employees;

export default employeeSlice.reducer;
