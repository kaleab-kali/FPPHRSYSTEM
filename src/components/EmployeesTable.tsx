import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Image, Input, Select, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import pic1 from '../assets/images/photo.jpg'
import getAge from "../util/ageCal";
interface DataType {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  title: string;
  action: string;
}

type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: "1",
//     firstName: "John",
//     lastName: "Brown",
//     age: 32,
//     title: "John Brown",
//     action: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     firstName: "Joe",
//     lastName: "Black",
//     age: 42,
//     title: "Joe Black",
//     action: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     firstName: "Jim",
//     lastName: "Green",
//     age: 32,
//     title: "Jim Green",
//     action: "Sydney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     firstName: "Jim",
//     lastName: "Red",
//     age: 32,
//     title: "Jim Red",
//     action: "London No. 2 Lake Park",
//   },
// ];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
 
  const handleView = (key: string) => {
    // push(`/employee/${key}`);
    navigate(`/employee/${key}`);
    // <EmployeeProfile key={key}/>
  };
  const handleDelete = (key: string) => {
    // push(`/employee/${key}`);
  };

  const { data, error, isLoading } = useQuery<DataType[], Error>("employees", async () => {
      const response = await fetch("http://localhost:3001/employees");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.warn('data')


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
          onChange={(e) =>
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Photo",
      dataIndex: `${<><img src={pic1} width={10} height={10} alt="employe phototo" /></>}`,
      key: "firstName",
      width: "30%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
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
            onClick={() => handleView(record.id)}
          >
            View
          </Button>
          <Button
            className=" bg-red-600 hover:bg-red-400 hover:text-white text-white"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
console.warn("the data is ",data)

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];
  return <> 
    <div>
      {/* <form>
          <div className="flex">
              <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white">Your Email</label>
              <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-slate-900 bg-slate-100 border border-slate-300 rounded-s-lg hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-slate-700 dark:text-white dark:border-slate-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg></button>
              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-slate-100 rounded-lg shadow w-44 dark:bg-slate-700">
                  <ul className="py-2 text-sm text-slate-700 dark:text-slate-200" aria-labelledby="dropdown-button">
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Mockups</button>
                  </li>
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Templates</button>
                  </li>
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Design</button>
                  </li>
                  <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Logos</button>
                  </li>
                  </ul>
              </div>
              <div className="relative w-full ">
                  <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-e-lg border-s-slate-50 border-s-2 border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-s-slate-700  dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required/>
                  <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                             Search
                  </button>
              </div>
          </div>
      </form> */}

      <form className="flex">   
        
        <label htmlFor="cars" ></label>
        <select id="cars" name="cars" className="flex-shrink-0 rounded-md mx-2 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-slate-900 bg-slate-100 border border-slate-300 rounded-s-lg hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-slate-700 dark:text-white dark:border-slate-600" >
          <option className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white" value="Name">Name</option>
          <option className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white" value="Id">Id</option>
          <option className="inline-flex w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white" value="mercedes">Address</option>
        </select>

       
          <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="text" id="voice-search" className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by id , name  , adress..." required/>
              <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                  <svg className="w-4 h-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                  </svg>
              </button>
          </div>
          <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4 me-2" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>Search
          </button>
      </form>



     <div className="search-table-outter wrapper shadow-md rounded-md  border-l-4  border-blue-500 w-full    mt-9">
     <table id="example" className="display nowrap p-5 w-full" > 
          <tbody className='justify-around py-10'>
            <tr className='text-slate-500 bg-slate-200 text-lg font-bold pt-4' style={{ textAlign: 'start' }}>
              <td>Photo</td>
              <td>Title</td>
              <td>Full Name</td>
              <td>Birth Date</td>
              <td>Action</td>
         
        
            </tr>
            {data&&data.map((data: any) => (
              <tr key={data.key} className='py-10 mb-10 overflow-y-auto text-slate-500' style={{ textAlign: 'start', margin: 32 }}>
                <td >
                  {/* <img src={pic1} width={80} height={80} alt="employe phototo" /> */}
                  <Image src={pic1} width={80} height={70} />
                  </td>
                <td>{data.title}</td>
                <td>{data.firstName}</td>
                <td>{data.birthday}</td>
                <td>
                  <div className="flex justify-evenly">
                    <span className="text-green-100 text-md font-bold px-4 bg-green-500 p-1 rounded-md hover:text-white hover:bg-green-600 cursor-pointer"
                    onClick={()=>handleView(data.id)}
                    >View</span>
                    <span className="text-red-100 text-md font-bold px-4 bg-red-500 p-1 rounded-md  hover:bg-red-600 cursor-pointer"
                     onClick={()=>handleView(data.id)}
                    >Delete</span>
                    </div>
                  
                </td>
               
           
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  {/* <Table columns={columns} dataSource={data} /> */}


  </>;
};

export default Profile;
