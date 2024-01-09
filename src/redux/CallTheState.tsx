import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from './store';
import { fetchEmployeeData,   } from './features/ayncThunkApi';

export default function CallTheState({
  children,
}: {
  children: React.ReactNode
}){
 const dispatch=useDispatch<AppDispatch>();
    useEffect(()=>{
      dispatch(fetchEmployeeData())
      
    },[dispatch])

//call teh s

  return (
    <div className="">

       {children}
    </div>
  );
};


