import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import {
  DownloadOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import EmployeesTable from "./EmployeesTable"; // Your employee table component

const { Text } = Typography;

const ProfileHeader: React.FC = () => {
  const [totalEmployees, setTotalEmployees] = useState<number>(100); 
  const [activeEmployees, setActiveEmployees] = useState<number>(85); 

  useEffect(() => {
    // Simulate live update of employee count (replace with actual logic)
    const interval = setInterval(() => {
      setTotalEmployees((prevTotal) => prevTotal + 1);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddEmployee = () => {
    // Logic to handle adding a new employee
  };

  const handleExport = () => {
    // Logic to handle exporting employee data
  };

  const handleRefresh = () => {
    // Logic to refresh or reload the employee list
  };

  return (
    <div>
      <Card
        title="Employee List"
        extra={[
          <Button
            key="addEmployee"
            type="primary"
            className=" bg-blue-500 hover:text-white"
            icon={<PlusOutlined />}
            onClick={handleAddEmployee}
          >
            Add Employee
          </Button>,
          <Button
            key="export"
            icon={<DownloadOutlined />}
            onClick={handleExport}
          >
            Export
          </Button>,
          <Button
            key="refresh"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>,
        ]}
      >
        <div className="flex flex-row justify-start space-x-10">
          <Card className="hover:bg-blue-100 hover:shadow-md hover:shadow-blue-300">
            <Space
              direction="vertical"
              style={{ marginLeft: "24px", marginTop: "16px" }}
            >
              <Text strong className=" text-4xl text-blue-400">
                +{totalEmployees}
              </Text> 
              <Text strong>Total Employees</Text>
            </Space>
          </Card>
          <Card className=" hover:bg-green-100 hover:shadow-md hover:shadow-green-300">
            <Space
              direction="vertical"
              style={{ marginLeft: "24px", marginTop: "16px" }}
            >
              <Text strong className=" text-4xl text-green-400">
                +{activeEmployees}
              </Text>
              <Text strong>Active Employees</Text>
            </Space>
          </Card>
        </div>
      </Card>
    <div className="px-10 py-5">

      <EmployeesTable />
    </div>
    </div>
  );
};

export default ProfileHeader;
