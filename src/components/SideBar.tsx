import React, { useState } from "react";
import {
  TeamOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input } from "antd";

import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

interface SidebarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path? : string;
  children?: { key: number; label: string ; path?: string }[];
}
type Props = {};

const sidebarItems: SidebarItem[] = [
  {
    key: "sub1",
    icon: <TeamOutlined />,
    label: "Employee Information",
    children: [
      { key: 1, label: "Employee Registration" },
      { key: 2, label: "Profile View" },
      { key: 3, label: "Reward", path: "/reward"},
      { key: 4, label: "Appreasal", path: "/appraisal" },
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

const SideBar = (props: Props) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  const [openKeys, setOpenKeys] = useState<string[]>(["sub1", "sub2"]);
  const handleSelect = (item: any) => {
    setSelectedKeys([item.key]);
  };
  return (
    <>
      <Sider
        width={230}
        style={{ background: "#fff", padding: "10px 5px" }}
        className="bg-black"
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          // className="bg-red-500"
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
                  className="text-slate-600 text-base font-bold"
                >
                  {item.children.map((child) => (
                    <Menu.Item key={`${item.key}-${child.key}`}>
                      <Link
                        to={
                          child.path
                            ? child.path
                            : `/${item.label}/${child.label}`
                        } // Use path if it exists
                        onClick={() => handleSelect(child)}
                      >
                        {child.label}
                      </Link>
                    </Menu.Item>
                  ))}
                  {/* {item.children.map((child) => (
                    <Menu.Item key={`${item.key}-${child.key}`}>
                      <Link
                        to={`/${item.label}/${child.label}`}
                        onClick={() => handleSelect(child)}
                      >
                        {child.label}
                      </Link>
                    </Menu.Item>
                  ))} */}
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
          <Menu.Item icon={<LineChartOutlined />}>
            <Link to="/aprisal">Apraisal</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;
