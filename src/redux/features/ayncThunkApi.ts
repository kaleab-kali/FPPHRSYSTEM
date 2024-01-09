import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EmployeeData } from "./employeeSlice";


export const fetchEmployeeData = createAsyncThunk<EmployeeData[]>("employeeData/fetch", async () => {
  try {
    const response = await axios.get(`http://localhost:8000/backend/employees`);
    const employeeData = response.data;
    console.log("fetch emp data from thunk ",employeeData);


    return employeeData;
  } catch (error) {
    throw error;
  }
});
export const postEmployeeData = createAsyncThunk<EmployeeData, EmployeeData>("employeeData/post",
  async (newEmployeeData) => {
    try {
      const response = await axios.post("http://localhost:8000/backend/employees", newEmployeeData);
      const postedEmployeeData = response.data;
      console.log("post emp data from thunk", postedEmployeeData);
      return postedEmployeeData;
    } catch (error) {
      throw error;
    }
  }
);