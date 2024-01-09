import { Header } from 'antd/es/layout/layout'
import React from 'react'
import '../App.css'
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
        className='bg-slate-700'
      >
        <h1 className='text-blue-200 font-bold text-xl '>Federal Prison Police</h1>
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
          {/* <Search
            placeholder="Search"
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: "300px" }}
            onSearch={(value) => console.log("Search:", value)}
            className='custom-search-input'
          /> */}

          <form className="flex">   
                               
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        </div>
                        <input type="text" id="voice-search" className="bg-slate-50 border border-blue-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Employee..." required/>
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                           
                        </button>
                    </div>
                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>Search
                    </button>
                </form>
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