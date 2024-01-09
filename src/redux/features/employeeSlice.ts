import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEmployeeData, postEmployeeData } from "./ayncThunkApi";

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
    // registerEmployee: (state, action: PayloadAction<any>) => {
    //   const { name,email } = action.payload;
    //   return {
    //     employeeValues: {
    //       email:email,
    //       username: name,
       
    //     },
    //   };
    //   },
    },
  extraReducers(builder) {
    builder.addCase(fetchEmployeeData.fulfilled,
      (state, action: PayloadAction<EmployeeData[]>) => {
        const employeeData = action.payload;
        console.log("employee data builder", employeeData);
        state.employeeValues = employeeData;
      }
      
    )
  .addCase(
      postEmployeeData.fulfilled,
      (state, action: PayloadAction<EmployeeData>) => {
        const newEmployeeData = action.payload;
        state.employeeValues = [...state.employeeValues, newEmployeeData];
      }
    );
  },
});
// export const { registerEmployee} = employeeSlice.actions;

export default employeeSlice.reducer;
