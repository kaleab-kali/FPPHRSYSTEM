// employeeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmployee = createAsyncThunk(
  "employee/fetch",
  async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/database/employee/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    } catch (error) {
      // Return an object with an 'error' property
      return { error: error};
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    data: null,
    error: null as string | null, // Explicitly specify the union type
    loading: false,
  },
  reducers: {
    // Define additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
export const {
  /* Define additional actions if needed */
} = employeeSlice.actions;
