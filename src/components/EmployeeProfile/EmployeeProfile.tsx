import React from "react";
import { Layout, Avatar, Row, Col, Typography, Space, Card ,Tabs } from "antd";
import "tailwindcss/tailwind.css";
import "./EmployeeProfile.css";
import GeneralInformation from "./Tabs/GeneralInformation";
import WorkExperience from "./Tabs/WorkExperience";
import LeaveInformation from "./Tabs/LeaveInformation";
import AttendanceInformation from "./Tabs/AttendanceInformation";
import PerformanceInformation from "./Tabs/PerformanceInformation";
import RewardInfomation from "./Tabs/RewardInfomation";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type TabItem = {
  label: string;
  key: string;
  component: React.ReactNode;
}

// const GeneralProfile: React.FC = () => <div>General component</div>
const Education: React.FC = () => <div>Education component</div>

const EmployeeProfile: React.FC = () => {
  const tabItems : TabItem[] = [
    {label: "General", key: "1", component: <GeneralInformation />},
    {label: "Educational", key: "2", component: <Education />},
    {label: "Work experience", key: "3", component: <WorkExperience />},
    {label: "Leave", key: "4", component: <LeaveInformation />},
    {label: "Attendance", key: "5", component: <AttendanceInformation />},
    {label: "Reward", key: "6", component: <RewardInfomation />},
    {label: "Performance", key: "7", component: <PerformanceInformation />},

  ]
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
                  David Williams
                </Title>
                <div className="text-sm leading-4">
                  {/* <Text className="block m-0">Business Analyst</Text> */}
                  <Text style={{ marginBottom: 0, display: "block" }}>
                    Business Analyst
                  </Text>
                  <Text style={{ display: "block" }}>4010018</Text>
                </div>
              </div>
            </Col>
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
                <Tabs.TabPane key={tab.key} tab={tab.label}>
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
