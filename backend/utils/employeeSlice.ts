// employeeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Employee } from './employeeInt';; // Assuming your TypeScript file has .ts extension

interface EmployeeState {
  employee: Employee | null;
}

const initialState: EmployeeState = {
  employee: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.employee = action.payload;
    },
  },
});

export const { setEmployee } = employeeSlice.actions;

export const selectEmployee = (state: RootState) => state.employee.employee;

export default employeeSlice.reducer;
