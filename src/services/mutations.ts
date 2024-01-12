import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeData } from "../types/employeeData";
import { createEmployee, deleteEmployee, updateEmployee } from "./api";

export function useCreateEmployee(){
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (data: EmployeeData) => createEmployee(data),
      onMutate: () => {
        console.log("Mutating");
      },
      onError: () => {
        console.log("error");
      },
      onSuccess: () => {
        console.log("success");
      },
      onSettled: async (_, error) => {
        console.log("settled");
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["employees"] });
        }
      },
    });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeData) => {
      console.log("Data before mutation:", data);
      return updateEmployee(data);
    },
    onSuccess() {
      console.log("Successfully updated employee");
    },
    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["employees"] });
        await queryClient.invalidateQueries({
          queryKey: ["employee", { id: variables._id }],
        });
      }
    },
  });
}

export function useDeleteEmployee(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess() {
        console.log("Successfully deleted employee")
    },
    onSettled: async(_,error)=>{
      if(error){
        console.log(error)
      }else{
        await queryClient.invalidateQueries({ queryKey: ["employees"] });
      }
    }
  })
}

