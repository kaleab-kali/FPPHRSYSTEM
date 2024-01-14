// import axios from "axios";
import { EmployeeData } from "../types/employeeData";

const BASE_URL = "http://localhost:8000";
// const axiosInstance = axios.create({baseURL: BASE_URL});

// export const getEmployeeIds = async() =>{
//     return (await axiosInstance.get<EmployeeData[]>("employees")).data.map(
//       (employee) => employee._id
//     );
// }

export const getEmployeeIds = async () => {
  const response = await fetch(`${BASE_URL}/employees`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee IDs");
  }

  const data = await response.json();

  return data.map((employee: EmployeeData) => employee._id);
};


// export const getEmployee = async (id:string) => {
//   return (await axiosInstance.get<EmployeeData>(`employees/${id}`)).data;
// };

export const getEmployee = async (id: string) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  const data = await response.json();

  return data;
};



// export const createEmployee = async (data:EmployeeData) => {
//    await axiosInstance.post("employees", data);
// };

export const createEmployee = async (data: EmployeeData) => {
  await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// export const updateEmployee = async (data: EmployeeData) => {
//    await axiosInstance.put(`employees/${data._id}`, data);
// };

export const updateEmployee = async (data: EmployeeData) => {
  const response = await fetch(`${BASE_URL}/employees/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee data");
  }
};

// export const deleteEmployee = async (id: string) => {
//   await axiosInstance.delete(`employees/${id}`);
// };

export const deleteEmployee = async (id: string) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
};
