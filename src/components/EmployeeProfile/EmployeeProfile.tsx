import React from "react";
import { Layout, Avatar, Row, Col, Typography, Space ,Tabs } from "antd";
import { useQuery } from 'react-query';
import "tailwindcss/tailwind.css";
import "./EmployeeProfile.css";
import GeneralInformation from "./Tabs/GeneralInformation";
import WorkExperience from "./Tabs/WorkExperience";
import LeaveInformation from "./Tabs/LeaveInformation";
import AttendanceInformation from "./Tabs/AttendanceInformation";
import PerformanceInformation from "./Tabs/PerformanceInformation";
import RewardInfomation from "./Tabs/RewardInfomation";
import EducationalInformation from "./Tabs/EducationalInformation";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type TabItem = {
  label: string;
  key: string;
  component: React.ReactNode;
}
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
}

const EmployeeProfile: React.FC = () => {
  const { data, error, isLoading } = useQuery<Employee[], Error>('employees', async () => {
    const response = await fetch('http://localhost:3001/employees');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const employeeData = data?.find((employee) => employee.id === 3);

  if (!employeeData) {
    return <p>No employee data found for ID 3</p>;
  }

  const { firstName, lastName, position, id } = employeeData;

  const tabItems: TabItem[] = [
    { label: "General", key: "1", component: <GeneralInformation /> },
    { label: "Educational", key: "2", component: <EducationalInformation /> },
    { label: "Work experience", key: "3", component: <WorkExperience /> },
    { label: "Leave", key: "4", component: <LeaveInformation /> },
    { label: "Attendance", key: "5", component: <AttendanceInformation /> },
    { label: "Reward", key: "6", component: <RewardInfomation /> },
    { label: "Performance", key: "7", component: <PerformanceInformation /> },
  ];

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
            <Col flex="auto">
              <div className="flex flex-col">
                <Title
                  level={4}
                  className="text-l leading-6 mb-1"
                  style={{ marginBottom: 0, fontWeight: "bold" }}
                >
                  {`${firstName} ${lastName}`}
                </Title>
                <div className="text-sm leading-4">
                  <Text style={{ marginBottom: 0, display: "block" }}>
                    {position}
                  </Text>
                  <Text style={{ display: "block" }}>{id}</Text>
                </div>
              </div>
            </Col>
          </Space>
        </Row>
      </Header>

      <Content>
        {/* Tabs of profile section */}
        <>
          <Tabs defaultActiveKey="1" centered>
            {tabItems.map((tab) => (
              <Tabs.TabPane key={tab.key} tab={tab.label}>
                {tab.component}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </>
      </Content>
    </Layout>
  );
};

export default EmployeeProfile;

