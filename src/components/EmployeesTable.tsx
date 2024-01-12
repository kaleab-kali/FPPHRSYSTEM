import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import EmployeeProfile from "./EmployeeProfile/EmployeeProfile";
import { useNavigate } from "react-router-dom";
import getAge from "../util/ageCal";
import { useEmployees, useEmployeesIds } from "../services/queries";
import { EmployeeData } from "../types/employeeData";
import { useDeleteEmployee } from "../services/mutations";
interface DataType {
  _id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  title: string;
  action: string;
}

type DataIndex = keyof DataType;


const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const deleteEmployeeMutuation= useDeleteEmployee();
  const handleView = (key: string) => {
    // push(`/employee/${key}`);
    navigate(`/employee/${key}`);
    // <EmployeeProfile key={key}/>
  };
  const handleDelete = (key: string) => {
    // push(`/employee/${key}`);
    deleteEmployeeMutuation.mutate(key);
  };

const employeesIdQuery = useEmployeesIds();
const employeeQueries = useEmployees(employeesIdQuery.data);
  const dataSource = employeeQueries
    .filter(queryResult => queryResult.isSuccess && queryResult.data !== undefined)
    .map(queryResult => queryResult.data as unknown as DataType); 
    console.log(dataSource);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e: { target: { value: React.Key; }; }) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType>= [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "30%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "30%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      width: "20%",
      ...getColumnSearchProps("birthday"),
      render: (birthday: string) => getAge(birthday),
      sorter: (a, b) => getAge(a.birthday) - getAge(b.birthday),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text, record) => (
        <Space>
          <Button
            type="primary"
            className=" bg-blue-500 hover:bg-blue-300 hover:text-white text-white"
            onClick={() => handleView(record._id)}
          >
            View
          </Button>
          <Button
            className=" bg-red-600 hover:bg-red-400 hover:text-white text-white"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default Profile;
