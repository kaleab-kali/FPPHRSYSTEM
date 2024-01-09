import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EmployeeData } from "./employeeSlice";


export const fetchEmployeeData = createAsyncThunk<EmployeeData[]>("employeeData/fetch", async () => {
  console.log("fetch emp data from thunk ","employeeData");
  
  try {
    const response = await axios.get(`http://localhost:8000/backend/employees`);
    const employeeData = response.data;
    console.warn("fetch emp data from thunk ",employeeData);


    return employeeData;
  } catch (error) {
    throw error;
  }
});