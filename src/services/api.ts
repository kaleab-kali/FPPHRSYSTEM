import axios from "axios";
import { EmployeeData } from "../types/employeeData";

const BASE_URL = "http://localhost:8000";
const axiosInstance = axios.create({baseURL: BASE_URL});

export const getEmployeeIds = async() =>{
    return (await axiosInstance.get<EmployeeData[]>("employees")).data.map(
      (employee) => employee._id
    );

}
export const getEmployee = async (id:string) => {
  return (await axiosInstance.get<EmployeeData>(`employees/${id}`)).data;
};

export const createEmployee = async (data:EmployeeData) => {
   await axiosInstance.post("employees", data);
};
export const updateEmployee = async (data: EmployeeData) => {
   await axiosInstance.put(`employees/${data._id}`, data);
};