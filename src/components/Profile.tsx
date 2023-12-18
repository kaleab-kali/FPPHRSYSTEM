
import { Avatar, Layout, Card, Typography, Image, Row } from 'antd';
import  photo from '../assets/images/photo.jpg'
import { Link } from 'react-router-dom';
import { Performance } from './user/Performance';
import Reward from './user/Reward';
import { useState } from 'react';
import { Wastna } from './user/Wastna';
import EducationEvaluation from './Tables/EducationEvaluation';
import RewardEvaluation from './Tables/RewardPerformance';
const { Title } = Typography;

interface ProfileProps {
  user: {
    name: string;
    avatarUrl: string;
    age: string;
    email: string;
    phone: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { name, avatarUrl,phone, age, email } = user;
  const [tab,setTab]=useState(0)
 const adjestingTabs=(tab:any)=>{
  setTab(tab)
 }
  return (
    <>
      <div onClick={()=>adjestingTabs(0)} className='text-2xl bg-slate-300 mt-4 text-slate-500 rounded-md flex justify-center w-full'>EMPLOYE INFORMATION</div>
      <div className="flex  w-full  mt-10 bg-slate-100">
        
          <Card className='w-1/3 bg-none'>
            <div className="card-header">
              <Typography.Title level={3}>{name}</Typography.Title>
            <Image src={photo} className='' width={150}height={150}/>

              {/* <Avatar size={64} src={avatarUrl} /> */}
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Age</span>
                <p className='text-sm font-thin text-slate-500'>{age}</p>
              </div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Email</span>
                <p className='text-sm font-thin text-slate-500'>{email}</p>
              </div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Phone</span>
                <p className='text-sm font-thin text-slate-500'>{phone}</p>
              </div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Current Address</span>
                <p className='text-sm font-thin text-slate-500'>Addis ababa, kolfe</p>
              </div>

              
            </div>
           
          </Card>
          {/* <hr className='h-72 bg-slate-300 w-1 mt-11 rounded-lg mr-4'/> */}
          <Card className='p-3 m-5 w-full'>
           {tab===0&& <div className={`flex flex-row justify-around `}>
              <div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'  >Current Address</span>
                <p className='text-sm font-thin text-slate-500'>Addis ababa , kolfe</p>
              </div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Birth Place</span>
                <p className='text-sm font-thin text-slate-500'>Addis Ababa, Kolfe</p>
              </div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Education Level</span>
                <p className='text-sm font-thin text-slate-500'>Degree</p>
              </div>
              <div className='pb-3'>
                <span className='text-slate-600 font-bold text-md mt-10'>Region</span>
                <p className='text-sm font-thin text-slate-500'>Oromia</p>
              </div>

              </div>
              <div className='ml-20'>
                <div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Birth Place</span>
                  <p className='text-sm font-thin text-slate-500'>Addis Ababa, Kolfe</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Education Level</span>
                  <p className='text-sm font-thin text-slate-500'>Degree</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Department</span>
                  <p className='text-sm font-thin text-slate-500'>SC</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Role</span>
                  <p className='text-sm font-thin text-slate-500'>General</p>
                </div>
                {/* <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>wastna</span>
                  <p className='text-sm font-thin text-slate-500'>yes</p>
                </div> */}
                

                </div>
              </div>
              <div className='ml-20'>
                <div >
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Salary</span>
                  <p className='text-sm font-thin text-slate-500'>9000</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>ማዕረግ ያገኘበት ቀን</span>
                  <p className='text-sm font-thin text-slate-500'>11-22-2015</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>እርከን የሚያገኝበት ቀን</span>
                  <p className='text-sm font-thin text-slate-500'>11-22-2015</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Wastna</span>
                  <p className='text-sm font-thin text-slate-500'>no</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Retierment Date</span>
                  <p className='text-sm font-thin text-slate-500'>23-3-2017</p>
                </div>
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Maereg yemiagegnbet ken</span>
                  <p className='text-sm font-thin text-slate-500'>23-3-2017</p>
                </div>
                
                </div>
              </div>

          
           </div>}
           {tab===1&&<div className={`flex flex-row justify-around `}>

           <RewardEvaluation />
           </div>}
           {tab===2&&<div className={`flex flex-row justify-around `}>
           <EducationEvaluation />

           {/* <Performance /> */}
           </div>}
           {tab===3&&<div className={`flex flex-row justify-around `}>

           <Wastna />
           </div>}
           {/* <Performance/> */}

        </Card>


      </div>
          <Row className='flex justify-around'>
         <span onClick={()=>adjestingTabs(1)} className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Reward Info</span>
           {/* <span onClick={()=>adjestingTabs(3)} className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Wastna</span> */}
         
         <span onClick={()=>adjestingTabs(2)} className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Performance </span>
         
          {/* <Link onClick={()=>adjestingTabs(2)} to={`/user/performance/${1}`} className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Performance evaluation</Link>
          <Link onClick={()=>adjestingTabs(3)} to={`/user/wastna/${1}`}  className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Wastna</Link> */}
          </Row>
    </>

  );
};

export default Profile;


