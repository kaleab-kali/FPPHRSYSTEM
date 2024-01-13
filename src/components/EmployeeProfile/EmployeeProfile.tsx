import React from "react";
import { Layout, Avatar, Row, Col, Typography, Space ,Tabs } from "antd";
import "tailwindcss/tailwind.css";
import "./EmployeeProfile.css";
import GeneralInformation from "./Tabs/GeneralInformation";
import WorkExperience from "./Tabs/WorkExperience";
import LeaveInformation from "./Tabs/LeaveInformation";
import AttendanceInformation from "./Tabs/AttendanceInformation";
import PerformanceInformation from "./Tabs/PerformanceInformation";
import EducationalInformation from "./Tabs/EducationalInformation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AppraisalInformation from "./Tabs/AppraisalInformation";
import { useFindEmployeeById } from "../../services/queries";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type TabItem = {
  label: string;
  key: string;
  component: React.ReactNode;
}

const Education: React.FC = () => <div>Education component</div>

const EmployeeProfile: React.FC = (key:any) => {
  const { id } = useParams<{ id: string }>(); 
    const {
      data: selectedEmployee,
      error,
      isLoading,
    } = useFindEmployeeById(id);


  const tabItems: TabItem[] = [
    { label: "General", key: "1", component: <GeneralInformation  selectedEmployee={selectedEmployee}  /> },
    { label: "Educational", key: "2", component: <EducationalInformation  selectedEmployee={selectedEmployee}  /> },
    { label: "Work experience", key: "3", component: <WorkExperience  selectedEmployee={selectedEmployee}  /> },
    { label: "Leave", key: "4", component: <LeaveInformation  selectedEmployee={selectedEmployee}  /> },
    { label: "Attendance", key: "5", component: <AttendanceInformation  selectedEmployee={selectedEmployee}  /> },
    // { label: "Reward", key: "6", component: <RewardInfomation  selectedEmployee={selectedEmployee}  /> },
    { label: "Performance", key: "7", component: <PerformanceInformation  selectedEmployee={selectedEmployee}  /> },
    // { label: "Apresal", key: "8", component: <AppraisalInformation  selectedEmployee={selectedEmployee}  /> },

  ];
  // const { data, error, isLoading } = useQuery<Employee[], Error>(
  //   "employees",
  //   async () => {
  //     const response = await fetch("http://localhost:8000/employees");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     return response.json();
  //   }
  // );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // const filteredData = data?.filter((employee) => employee.id === Number(id))[0];

  // if (!filteredData) {
  //   return <p>No data found for ID {id}</p>;
  // }
  // if (data) {
  //   return <p> data found for ID {id}</p>;
  // }

  // const {
  //   firstName,
  //   // middleName,
  //   lastName,
  //   birthday,
  //   gender,
  //   position,
  //   phone,
  //   email,
  //   emergencyContact,
  // } = filteredData;
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: "20px 40px",
          marginBottom: "50px",
        }}
      >
        <Row
          align="middle"
          className="space-x-4"
          style={{ alignItems: "center" }}
        >
          <Space>
            <Col flex="none">
              <Avatar
                size={80}
                icon={<img src="/logo192.png" alt="Employee" />}
              />
            </Col>
            {/* <Col flex="auto">
              <div className="flex flex-col">
                <Title
                  level={4}
                  className="text-l leading-6 mb-1"
                  style={{ marginBottom: 0, fontWeight: "bold" }}
                >
                  {firstName + " " + lastName}
                </Title>
                <div className="text-sm leading-4">
                  <Text style={{ marginBottom: 0, display: "block" }}>
                    {position}
                  </Text>
                  <Text style={{ display: "block" }}>4010018</Text>
                </div>
              </div>
            </Col> */}
          </Space>
        </Row>
      </Header>

      <Content>
      {/* <>
        <Row gutter={[0, 0]}>
          <Col span={12}>
            <Card className="border-light card-item custom-ant-card" hoverable>
              +8777 555-0733
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{ padding: "0" }}
              className="border-light card-item custom-ant-card"
              hoverable
            >
              d.w@xplugix.com
            </Card>
          </Col>
          <Col span={12}>
            <Card className="border-light card-item custom-ant-card" hoverable>
              Cambridge, United Kingdom
            </Card>
          </Col>
          <Col span={12}>
            <Card className="border-light card-item custom-ant-card" hoverable>
              &lt;2 years
            </Card>
          </Col>
        </Row>
        
        </> */}
         {/* Tabs of profile section */}
        <>
          <Tabs defaultActiveKey="1" centered>
            {
              tabItems.map((tab) => (
                <Tabs.TabPane key={tab.key}
                 tab={<div className="text-blue-900 bg-blue-100 p-2 px-4 rounded-md hover:bg-blue-500 hover:text-blue-100 ">{tab.label}</div>}
                  className="">
                   {tab.component}
                </Tabs.TabPane>
              ))
            }
          </Tabs>
        </>


      </Content>
    </Layout>
  );
};

export default EmployeeProfile;
