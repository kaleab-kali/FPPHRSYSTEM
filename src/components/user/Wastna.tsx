import { Button, Form, Input, Modal, Radio, Select, Table } from 'antd'
import { Option } from 'antd/es/mentions'
import React, { useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";
interface WastnaItem {
  id: number;
  wastenaType: string;
  companyName: string;
  toWhom: string;
  salaryLevel: string;
  wastenaAmount: string;
  action: number;
}
export const Wastna = () => {
  const {Option}=Select;
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRewardStatusChange = (value: string) => {
    setShowAdditionalFields(value === "yes");
  };
const columns = [
  {
    title: "Wastena Type",
    dataIndex: "wastenaType",
    key: "wastenaType",
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
  },
  { title: "To Whom", dataIndex: "toWhom", key: "toWhom" },
  {
    title: "Salary Level",
    dataIndex: "salaryLevel",
    key: "salaryLevel",
  },
  {
    title: "Wastena Amount",
    dataIndex: "wastenaAmount",
    key: "wastenaAmount",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    // render: () => (
    //   <div className="flex flex-row space-x-4">
    //     <Button
    //       type="link"
    //       className="bg-red-700 text-white"
    //       // onClick={() => removeDegree(educationLevel, record.id)}
    //     >
    //       Remove
    //     </Button>
    //     <Button
    //       type="link"
    //       className="bg-blue-700 text-white"
    //       // onClick={() => removeDegree(educationLevel, record.id)}
    //     >
    //       Update
    //     </Button>
    //   </div>
    // ),
  },
];
const dataSource: WastnaItem[] = [
  {
    id: 1,
    wastenaType: "Loan",
    companyName: "Dereja",
    toWhom: "Abebe Mola",
    salaryLevel: "30,000",
    wastenaAmount: "40,000",
    action: 1,
  },
];
  return (
    <div>
      <Button onClick={() => showModal()}>
        <PlusOutlined />
        Add
      </Button>
      <Modal
        title="Add Education Level"
        visible={isModalVisible}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
      >
        <Form.Item
          label="የዋስትና ሁኔታ"
          name="rewardStatus"
          rules={[
            { required: true, message: "Please select the reward status" },
          ]}
        >
          <Radio.Group
            onChange={(e) => handleRewardStatusChange(e.target.value)}
          >
            <Radio value="yes">አለው</Radio>
            <Radio value="no">የለውም</Radio>
          </Radio.Group>
        </Form.Item>

        {showAdditionalFields && (
          <>
            <Form.Item
              label="Wastena type/የዋስትና አይነት"
              name="wastenaType"
              rules={[
                { required: true, message: "Please select the wastena type" },
              ]}
            >
              <Select>
                <Option value="employment">Employment /የቅጥር</Option>
                <Option value="loan">Loan/ የብድር</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="ዋስትና የሚሆንበት መስሪያ ቤት"
              name="wastenaLocation"
              rules={[
                {
                  required: true,
                  message: "Please enter the wastena location",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ለማን ዋስትና እንደሚሆን"
              name="wastenaReason"
              rules={[
                {
                  required: true,
                  message: "Please enter the reason for wastena",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ደሞዝ መጠን/Salary level"
              name="salaryLevel"
              rules={[
                { required: true, message: "Please enter the salary level" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="የዋስትና የብር መጠን"
              name="wastenaAmount"
              rules={[
                { required: true, message: "Please enter the wastena amount" },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}
      </Modal>
      {/* <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        style={{ marginTop: 16 }}
      /> */}
      <br /><br /><br />
      <div className="search-table-outter wrapper mb-11 shadow-md rounded-md  border-l-4  border-blue-500     mt-9">
        <table
          id="example"
          className="display nowrap p-5"
          style={{ width: "100%" }}
        >
          <tbody className="justify-around py-10">
            <tr
              className="text-slate-600 bg-slate-200 text-md font-bold pt-4"
              style={{ textAlign: "start" }}
            >
              <td>Wstna Type</td>
              <td>Company Name</td>
              <td>To whom</td>
              <td>Salary level</td>
              <td>Wastna Amout</td>
              <td>Action</td>
             
            </tr>
            {dataSource.map((data: any) => (
              <tr
                key={data.key}
                className="py-10 mb-10 text-slate-500"
                style={{ textAlign: "start", margin: 32 }}
              >
                <td>{data.wastenaType}</td>
                <td>{data.companyName}</td>
                <td>{data.toWhom}</td>
                <td>{data.salaryLevel}</td>
                <td>{data.wastenaAmount}</td>
                <td>{data.action}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
