import { Header } from 'antd/es/layout/layout'
import React from 'react'
import {
    UserOutlined,
    SearchOutlined,
    BellOutlined,
    ScheduleOutlined,
    MessageOutlined,
    InfoCircleOutlined,
    PoweroffOutlined,
  } from "@ant-design/icons";
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

  import "../App.css";
  const { Search } = Input;
type Props = {}

const Navbar = (props: Props) => {
    
    const handleNotificationClick = () => {
        message.info("New message: You have 5 new messages.");
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

  return (<>
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
  </>
  )
}

export default Navbar