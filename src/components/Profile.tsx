

import { Avatar, Layout, Card, Typography, Image } from 'antd';
import  photo from '../assets/images/photo.jpg'
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

  return (
    <>
      <div className='text-2xl bg-slate-300 mt-4 text-slate-500 rounded-md flex justify-center w-full'>EMPLOYE INFORMATION</div>
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
            <div className="flex flex-row justify-around">
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
                <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>Role</span>
                  <p className='text-sm font-thin text-slate-500'>General</p>
                </div>
                

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
                  <span className='text-slate-600 font-bold text-md mt-10'>Bail</span>
                  <p className='text-sm font-thin text-slate-500'>yes</p>
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

          
           </div>
         
        </Card>

      </div>
    </>
  );
};

export default Profile;




// // Profile.tsx

// import React from 'react';
// import { Card, Avatar } from 'antd';

// interface ProfileProps {
//   name: string;
//   age: number;
//   sex: string;
//   position: string;
//   department: string;
//   pictureUrl: string;
// }

// const Profile: React.FC<ProfileProps> = ({
//   name,
//   age,
//   sex,
//   position,
//   department,
//   pictureUrl,
// }) => {
//   return (
//     <Card>
//       <Card.Meta
//         avatar={<Avatar src={pictureUrl} />}
//         title={name}
//         description={`Age: ${age} | Sex: ${sex}`}
//       />
//       <div style={{ marginTop: '16px' }}>
//         <p>Position: {position}</p>
//         <p>Department: {department}</p>
//       </div>
//     </Card>
//   );
// };

// export default Profile;
