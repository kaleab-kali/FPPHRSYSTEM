import React, { useState } from "react";
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  SearchOutlined,
  BellOutlined,
  ScheduleOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
// import type { MenuProps } from "antd";
import {
  Layout,
  Menu,
  Badge,
  Avatar,
  Space,
  Input,
  Dropdown,
  message,
} from "antd";
import "./App.css";
import {
  Route,
  Routes, // Import Routes instead of Switch
  Link,
} from "react-router-dom";
import MyForm from "./components/Form";
import Messages from "./components/Messages";
import Profile from "./components/ProfileHeader";
import EmployeeInfo from "./components/EmployeeProfile/EmployeeProfile";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import Reward from "./components/Reward";
import "./App.css";
// import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";


const { Header, Content, Sider } = Layout;
const { Search } = Input;

interface SidebarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: { key: number; label: string }[];
}
const generateSampleMessages = () => {
  const messages = [];
  for (let i = 1; i <= 10; i++) {
    messages.push({
      content: `Message ${i} content.`,
      date: `2023-12-${i < 10 ? "0" + i : i}`,
    });
  }
  return messages;
};

const getDropdownContent = () => {
  const messages = generateSampleMessages().slice(0, 6);

  return (
    <div style={{ width: "300px" }}>
      {messages.map((msg) => (
        <div
          key={msg.date}
          style={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ margin: 0 }}>{msg.content}</p>
          </div>
          <div style={{ color: "#8c8c8c", fontSize: "12px" }}>{msg.date}</div>
        </div>
      ))}
      {messages.length < 10 && (
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <a href="/messages" style={{ color: "#1890ff" }}>
            Show More
          </a>
        </div>
      )}
    </div>
  );
};
const avatarmenu = (
  <Menu>
    <Menu.Item key="personal" icon={<InfoCircleOutlined />}>
      <a href="/personal">Personal Information</a>
    </Menu.Item>
    <Menu.Item key="messages" icon={<MessageOutlined />}>
      <a href="/messages">Messages</a>
    </Menu.Item>
    <Menu.Item key="schedule" icon={<ScheduleOutlined />}>
      <a href="/schedule">Schedule</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="signout" icon={<PoweroffOutlined />} danger>
      Sign Out
    </Menu.Item>
  </Menu>
);

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
    ],
  },
];

const App: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  const [openKeys, setOpenKeys] = useState<string[]>(["sub1", "sub2"]); // Initial open submenus

  const handleSelect = (item: any) => {
    setSelectedKeys([item.key]);
  };
  const handleNotificationClick = () => {
    // Sample message when the notification icon is clicked
    message.info("New message: You have 5 new messages.");
  };
  return (
    <Layout className="">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ color: "white" }}>Federal Prison Police</h1>
        {/* Company logo */}
        {/* <div
          className="logo"
          style={{ width: "120px", height: "50px", background: "white" }}
        >
         
          
          <img
            src="../public/1698667206586.jpg"
            alt="Company Logo"
            style={{ width: "100%" }}
          />
        </div> */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {/* Search field */}
          <Search
            placeholder="Search"
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: "300px" }}
            onSearch={(value) => console.log("Search:", value)}
          />
        </div>

        {/* Notification icon and Avatar with Dropdown */}
        <Space size="middle">
          {/* Notification icon */}
          <Badge
            count={5}
            overflowCount={10}
            style={{ fontSize: "1rem", marginBottom: "1px" }}
          >
            <BellOutlined
              style={{
                fontSize: "1.5rem",
                color: "white",
                verticalAlign: "middle",
              }}
              onClick={handleNotificationClick}
            />
          </Badge>

          {/* Avatar with Dropdown */}
          <Dropdown overlay={avatarmenu} trigger={["click"]}>
            <Avatar icon={<UserOutlined />} size="large" />
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Sider width={230} style={{ background: "#fff", padding: "10px 5px" }}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
          >
            {sidebarItems.map((item) => (
              <React.Fragment key={item.key}>
                {item.children ? (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                    onTitleClick={() =>
                      setOpenKeys((keys) =>
                        keys.includes(item.key)
                          ? keys.filter((k) => k !== item.key)
                          : [...keys, item.key]
                      )
                    }
                  >
                    {item.children.map((child) => (
                      <Menu.Item key={`${item.key}-${child.key}`}>
                        <Link
                          to={`/${item.label}/${child.label}`}
                          onClick={() => handleSelect(child)}
                        >
                          {child.label}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link
                      to={`/${item.label}`}
                      onClick={() => handleSelect(item)}
                    >
                      {item.label}
                    </Link>
                  </Menu.Item>
                )}
              </React.Fragment>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "10px 20px 24px" }}>
          <Content
            className="mainContent"
            style={{
              padding: 0,
              margin: 0,
              // height: '100vh',
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
              {/* <Route path="/" element={<PositionsListContainer />} /> */}
              <Route path="/employee/:id" element={<EmployeeProfile />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
