
import { Avatar, Layout, Card, Typography, Image, Row } from 'antd';
import  photo from '../assets/images/photo.jpg'
import { Link } from 'react-router-dom';
import { Performance } from './user/Performance';
import Reward from './user/Reward';
import { useState } from 'react';
import { Wastna } from './user/Wastna';
import {
  UserOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  TrophyOutlined,
  InfoOutlined,
  PaperClipOutlined,
  EditOutlined,
  
} from "@ant-design/icons";
import EducationLevel from './user/EducationLevel';
import Meareg from './user/Meareg';
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
interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}
interface ProfileData {
  fullName: string;
  employeeID: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  nationality: string;
  contactInfo: ContactInfo;
  // Add more information as needed
}
const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { name, avatarUrl,phone, age, email } = user;
  const [tab,setTab]=useState(0)
 const adjestingTabs=(tab:any)=>{
  setTab(tab)
 }
 const profileData: ProfileData = {
  fullName: 'John Doe',
  employeeID: '12345',
  gender: 'Male',
  dateOfBirth: 'January 1, 1990',
  maritalStatus: 'Single',
  nationality: 'US',
  contactInfo: {
    address: '123 Main St, Cityville, USA',
    phone: '+1 123-456-7890',
    email: 'john.doe@example.com',
  }}
  return (
    <>
      <div
        onClick={() => adjestingTabs(0)}
        className="text-2xl bg-slate-300 mt-4 text-slate-500 rounded-md flex justify-center w-full"
      >
        EMPLOYE INFORMATION
      </div>
      <div className="flex  w-full  mt-10 bg-slate-100">
        <Card className="w-1/3 bg-none">
          <div className="card-header">
            <Image
              src={photo}
              className="rounded-xl"
              width={150}
              height={150}
            />
            <Typography.Title level={3}>{name}</Typography.Title>
            <p className="text-sm font-thin text-slate-500 -mt-2 text-center">
              {email}
            </p>
            <div className="flex flex-col space-y-3 mt-3">
              <span
                onClick={() => adjestingTabs(0)}
                className={`rounded-md hover:bg-blue-300 text-slate-600 p-2 text-center flex justify-start cursor-pointer ${
                  tab === 0 && "border border-t-transparent border-b-blue-500"
                }`}
              >
                <UserOutlined className="pr-3" />
                Basic Info
              </span>

              <span
                onClick={() => adjestingTabs(1)}
                className={`rounded-md hover:bg-blue-300 text-slate-600 p-2 text-center flex justify-start cursor-pointer ${
                  tab === 1 && "border border-t-transparent border-b-blue-500"
                }`}
              >
                <TrophyOutlined className="pr-3" />
                Reward Info
              </span>

              <span
                onClick={() => adjestingTabs(2)}
                className={`rounded-md hover:bg-blue-300 text-slate-600 p-2 text-center flex justify-start cursor-pointer ${
                  tab === 2 && "border border-t-transparent border-b-blue-500"
                }`}
              >
                <MedicineBoxOutlined className="pr-3" />
                Performance{" "}
              </span>
              <span
                onClick={() => adjestingTabs(3)}
                className={`rounded-md hover:bg-blue-300 text-slate-600 p-2 text-center flex justify-start cursor-pointer ${
                  tab === 3 && "border border-t-transparent border-b-blue-500"
                }`}
              >
                <IdcardOutlined className="pr-3" />
                Wastna
              </span>
              <span
                onClick={() => adjestingTabs(4)}
                className={`rounded-md hover:bg-blue-300 text-slate-600 p-2 text-center flex justify-start cursor-pointer ${
                  tab === 4 && "border border-t-transparent border-b-blue-500"
                }`}
              >
                <PaperClipOutlined className="pr-3" />
                Educational Level
              </span>
              <span
                onClick={() => adjestingTabs(5)}
                className={`rounded-md hover:bg-blue-300 text-slate-600 p-2 text-center flex justify-start cursor-pointer ${
                  tab === 5 && "border border-t-transparent border-b-blue-500"
                }`}
              >
                <EditOutlined className="pr-3" />
                Meareg
              </span>
            </div>
            {/* <Avatar size={64} src={avatarUrl} /> */}
            {/* <div className="pb-3">
              <span className="text-slate-600 font-bold text-md mt-10">
                Age
              </span>
              <p className="text-sm font-thin text-slate-500">{age}</p>
            </div>
            <div className="pb-3">
              <span className="text-slate-600 font-bold text-md mt-10">
                Email
              </span>
              <p className="text-sm font-thin text-slate-500">{email}</p>
            </div>
            <div className="pb-3">
              <span className="text-slate-600 font-bold text-md mt-10">
                Phone
              </span>
              <p className="text-sm font-thin text-slate-500">{phone}</p>
            </div>
            <div className="pb-3">
              <span className="text-slate-600 font-bold text-md mt-10">
                Current Address
              </span>
              <p className="text-sm font-thin text-slate-500">
                Addis ababa, kolfe
              </p>
            </div> */}
          </div>
        </Card>
        {/* <hr className='h-72 bg-slate-300 w-1 mt-11 rounded-lg mr-4'/> */}
        <Card className="p-3 m-5 w-full">
          {tab === 0 && (
            <div className={`flex flex-row justify-around `}>
              {/* <Descriptions bordered column={1}>
        <Descriptions.Item label="Full Name">{profileData.fullName}</Descriptions.Item>
        <Descriptions.Item label="Employee ID">{profileData.employeeID}</Descriptions.Item>
        <Descriptions.Item label="Gender">{profileData.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{profileData.dateOfBirth}</Descriptions.Item>
        <Descriptions.Item label="Marital Status">{profileData.maritalStatus}</Descriptions.Item>
        <Descriptions.Item label="Nationality">{profileData.nationality}</Descriptions.Item>
        <Descriptions.Item label="Address">{profileData.contactInfo.address}</Descriptions.Item>
        <Descriptions.Item label="Phone">{profileData.contactInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="Email">{profileData.contactInfo.email}</Descriptions.Item>
        
      </Descriptions> */}
              <div>
                <div className="pb-3">
                  <span className="text-slate-600 font-bold text-md mt-10">
                    Current Address
                  </span>
                  <p className="text-sm font-thin text-slate-500">
                    Addis ababa , kolfe
                  </p>
                </div>
                <div className="pb-3">
                  <span className="text-slate-600 font-bold text-md mt-10">
                    Birth Place
                  </span>
                  <p className="text-sm font-thin text-slate-500">
                    Addis Ababa, Kolfe
                  </p>
                </div>
                <div className="pb-3">
                  <span className="text-slate-600 font-bold text-md mt-10">
                    Education Level
                  </span>
                  <p className="text-sm font-thin text-slate-500">Degree</p>
                </div>
                <div className="pb-3">
                  <span className="text-slate-600 font-bold text-md mt-10">
                    Region
                  </span>
                  <p className="text-sm font-thin text-slate-500">Oromia</p>
                </div>
              </div>
              <div className="ml-20">
                <div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Birth Place
                    </span>
                    <p className="text-sm font-thin text-slate-500">
                      Addis Ababa, Kolfe
                    </p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Education Level
                    </span>
                    <p className="text-sm font-thin text-slate-500">Degree</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Department
                    </span>
                    <p className="text-sm font-thin text-slate-500">SC</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Role
                    </span>
                    <p className="text-sm font-thin text-slate-500">General</p>
                  </div>
                  {/* <div className='pb-3'>
                  <span className='text-slate-600 font-bold text-md mt-10'>wastna</span>
                  <p className='text-sm font-thin text-slate-500'>yes</p>
                </div> */}
                </div>
              </div>
              <div className="ml-20">
                <div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Salary
                    </span>
                    <p className="text-sm font-thin text-slate-500">9000</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      ማዕረግ ያገኘበት ቀን
                    </span>
                    <p className="text-sm font-thin text-slate-500">
                      11-22-2015
                    </p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      እርከን የሚያገኝበት ቀን
                    </span>
                    <p className="text-sm font-thin text-slate-500">
                      11-22-2015
                    </p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Wastna
                    </span>
                    <p className="text-sm font-thin text-slate-500">no</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Retierment Date
                    </span>
                    <p className="text-sm font-thin text-slate-500">
                      23-3-2017
                    </p>
                  </div>
                  <div className="pb-3">
                    <span className="text-slate-600 font-bold text-md mt-10">
                      Maereg yemiagegnbet ken
                    </span>
                    <p className="text-sm font-thin text-slate-500">
                      23-3-2017
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === 1 && (
            <div className={`flex flex-row justify-around `}>
              <Reward />
            </div>
          )}
          {tab === 2 && (
            <div className={`flex flex-row justify-around `}>
              <Performance />
            </div>
          )}
          {tab === 3 && (
            <div className={`flex flex-row justify-around `}>
              <Wastna />
            </div>
          )}
          {tab === 4 && (
            <div className={`flex flex-row justify-around `}>
              <EducationLevel />
            </div>
          )}
          {tab === 5 && (
            <div className={`flex flex-row justify-around `}>
              <Meareg />
            </div>
          )}
          {/* <Performance/> */}
        </Card>
      </div>
      <Row className="flex justify-around">
        {/* <span
          onClick={() => adjestingTabs(1)}
          className="bg-slate-300 rounded-md text-slate-600 p-2 px-7"
        >
          Reward Info
        </span>
        <span
          onClick={() => adjestingTabs(2)}
          className="bg-slate-300 rounded-md text-slate-600 p-2 px-7"
        >
          Performance{" "}
        </span>
        <span
          onClick={() => adjestingTabs(3)}
          className="bg-slate-300 rounded-md text-slate-600 p-2 px-7"
        >
          Wastna
        </span> */}

        {/* <Link onClick={()=>adjestingTabs(2)} to={`/user/performance/${1}`} className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Performance evaluation</Link>
          <Link onClick={()=>adjestingTabs(3)} to={`/user/wastna/${1}`}  className='bg-slate-300 rounded-md text-slate-600 p-2 px-7'>Wastna</Link> */}
      </Row>
    </>
  );
};

export default Profile;


