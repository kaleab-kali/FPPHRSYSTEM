import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEmployeeData } from "./ayncThunkApi";

export interface EmployeeData {
  _id: string;
  name: string;
  email: string;
  requiredField: string;
  houseNumber: string;
  relationship: string;
  leyuBota?: string;
  maritalStatus: {
    martialType: string;
    spouseInfo: {
      firstName: string;
      middleName: string;
      lastName: string;
      dob: Date;
      phoneNumber: {
        prefix: string;
        number: number;
      };
      address: {
        currentAddress: {
          region: string;
          subcity: string;
        };
      };
    };
    divorcedInfo: {
      divorceDate: Date;
    };
  };
}

type InitialState = {
  employeeValues: EmployeeData[];
};

const initialState: InitialState = {
  employeeValues: [],
};

export const employeeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Your existing reducers here if needed
  },
  extraReducers(builder) {
    builder.addCase(
      fetchEmployeeData.fulfilled,
      (state, action: PayloadAction<EmployeeData[]>) => {
        const employeeData = action.payload;
        console.log("employee data builder", employeeData);
        state.employeeValues = employeeData;
      }
    );
  },
});

export default employeeSlice.reducer;
