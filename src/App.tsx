import React, { useEffect, useState } from "react";
import {  TeamOutlined,  ClockCircleOutlined,CalendarOutlined,ExclamationCircleOutlined,LineChartOutlined,} from "@ant-design/icons";
import {Layout,  Input,} from "antd";
import "./App.css";
import {  Route,Routes,} from "react-router-dom";
import MyForm from "./components/Form";
import Messages from "./components/Messages";
import Profile from "./components/ProfileHeader";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import Reward from "./components/Reward";
import "./App.css";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import AppraisalInformation from "./components/EmployeeProfile/Tabs/AppraisalInformation";
import ApraisalForm from "./components/ApraisalForm";



const {  Content } = Layout;

interface SidebarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: { key: number; label: string }[];
}


const sidebarItems: SidebarItem[] = [
  {
    key: "sub1",
    icon: <TeamOutlined />,
    label: "Employee Information",
    children: [
      { key: 1, label: "Employee Registration" },
      { key: 2, label: "Profile View" },
      { key: 3, label: "Profile Edit" },
    ],
  },
  {
    key: "sub2",
    icon: <ClockCircleOutlined />,
    label: "Attendance",
    children: [
      { key: 1, label: "Meeting Attendance" },
      { key: 2, label: "Remote Attendance" },
      { key: 3, label: "Overtime Tracking" },
      { key: 4, label: "Leave Requests" },
    ],
  },
  {
    key: "sub3",
    icon: <CalendarOutlined />,
    label: "Leave",
    children: [
      { key: 5, label: "Vacation Leave" },
      { key: 6, label: "Sick Leave" },
      { key: 7, label: "Maternity Leave" },
      { key: 8, label: "Paternity Leave" },
    ],
  },
  {
    key: "sub4",
    icon: <ExclamationCircleOutlined />,
    label: "Complaint",
    children: [
      { key: 9, label: "Employee Feedback" },
      { key: 10, label: "Technical Issues" },
      { key: 11, label: "Work Environment" },
      { key: 12, label: "Management Concerns" },
    ],
  },
  {
    key: "sub5",
    icon: <LineChartOutlined />,
    label: "Performance Management",
    children: [
      { key: 13, label: "Goal Setting" },
      { key: 14, label: "Performance Reviews" },
      { key: 15, label: "Training and Development" },
      { key: 16, label: "Recognition and Rewards" },
      { key: 17, label: "Appraisals" },
    ],
  },
];

const App: React.FC = () => {
  // const dispatch=useDispatch<AppDispatch>();
  // useEffect(()=>{
  //   dispatch(fetchEmployeeData())
    
  // },[dispatch])

  return (
    <Layout className="">
     <Navbar/>
      <Layout>
        <SideBar/>
        <Layout style={{ padding: "10px 20px 24px" }}>
          <Content
            className="mainContent"
            style={{
              padding: 0,
              margin: 0,
              background: "#fff",
            }}
          >
            <Routes>
              {sidebarItems
                .filter((item) => item.children)
                .flatMap((item) =>
                  item.children!.map((child) => (
                    <Route
                      key={child.key}
                      path={`/${item.label}/${child.label}`}
                      element={
                        child.label === "Employee Registration" ? (
                          <>
                            <h1 className="content-h1">{child.label} Form</h1>
                            <MyForm />
                          </>
                        ) : child.label === "Profile View" ? (
                          <>
                            {/* <h1>{child.label} </h1>  */}
                            <Profile />
                            {/* <Profile name={""} age={0} sex={""} position={""} department={""} pictureUrl={""} /> */}
                          </>
                        ) : child.label === "Profile Edit" ? (
                          <>
                            <h1>{child.label} Component</h1>
                            <Reward />
                          </>
                        ) : (
                          <h1>{child.label} Page Content</h1>
                        )
                      }
                    />
                  ))
                )}

              {sidebarItems
                .filter((item) => item.children)
                .flatMap((item) =>
                  item.children!.map((child) => (
                    <Route
                      key={child.key}
                      path={`/${item.label}/${child.label}`}
                      element={<h1>{child.label} Page Content</h1>}
                    />
                  ))
                )}

              <Route path="/messages" element={<Messages />} />
              <Route path="/employee/:id" element={<EmployeeProfile />} />
              <Route path="/aprisal" element={<ApraisalForm />} />
              <Route path="/reward" element={<Reward/>} />
              <Route path="/appraisal" element={<ApraisalForm />} />

            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
