import { useQueries, useQuery } from "@tanstack/react-query";
import { getEmployee, getEmployeeIds } from "./api";

export function useEmployeesIds(){
    return useQuery({
        queryKey: ["employees"],
        queryFn: getEmployeeIds,
    })
}
export function useEmployees(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id)=> {
        return {
            queryKey: ["employee", {id}],
            queryFn: ()=>getEmployee(id!),
        }
    })
})
}
export function useFindEmployeeById(id: string|undefined) {
    return useQuery({queryKey:["employee", id],
    queryFn: () => getEmployee(id!)});
//   return data.map((employee) => employee._id === id);
}