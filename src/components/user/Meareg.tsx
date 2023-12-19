import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Modal,
  Slider,
  InputNumber,
  Space,
  Radio,
  Select,
  Table,
  DatePicker,
  Divider,
  Checkbox,
} from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
type Props = {};
interface Meareg {
  id: number;
  currentRank: number;
  requestedRank: number;
  when: number;
  totlaValue: number;
  evaluation: number;
  action: number;
}
const Meareg = (props: Props) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);
  const [inputValue7, setInputValue7] = useState(0);
  const [total, setTotal] = useState(0);
  const [subtractedValue, setSubtractedValue] = useState(0);

  const updateTotal = () => {
    const newTotal =
      inputValue1 + inputValue2 + inputValue3 + inputValue4 + inputValue5;
    setTotal(newTotal);
    const newSubtractedValue = subtractFromTotal ? newTotal - inputValue7 : 0;
    setSubtractedValue(newSubtractedValue);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const onChange1 = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue1(value);
    updateTotal();
  };
  const onChange2 = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue2(value);
    updateTotal();
  };
  const onChange3 = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue3(value);
    updateTotal();
  };
  const onChange4 = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue4(value);
    updateTotal();
  };
  const onChange5 = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue5(value);
    updateTotal();
  };
  const onChange7 = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue7(value);
    updateTotal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const subtractFromTotal = true;
  const columns = [
    {
      title: "Current Rank",
      dataIndex: "currentRank",
      key: "currentRank",
    },
    {
      title: "Requested Rank",
      dataIndex: "requestedRank",
      key: "requestedRank",
    },
    { title: "When they get the rank", dataIndex: "wtgtr", key: "wtgtr" },
    {
      title: "Total Value",
      dataIndex: "totalValue",
      key: "totalValue",
    },
    {
      title: "Evaluation",
      dataIndex: "evaluation",
      key: "evaluation",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => <Button type="link">Remove</Button>,
    },
  ];
    const dataSource: Meareg[] = [
      {
        id: 1,
        currentRank: 2,
        requestedRank: 2,
        when: 2022,
        totlaValue: 10,
        evaluation: 1,
        action: 1,
      },
    ];
    
  return (
    <div className="flex flex-col w-full">
      <Button onClick={() => showModal()}>
        <PlusOutlined />
        New Request
      </Button>
      <Modal
        title="Request"
        visible={isModalVisible}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Select Current Rank">
            <Select>
              <Option value="sergeant">Sergeant</Option>
              <Option value="colonel">Colonel</Option>
              <Option value="general">General</Option>
            </Select>
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Middle Name"
                name="middleName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Requested Rank">
            <Select>
              <Option value="sergeant1">Sergeant</Option>
              <Option value="colonel1">Colonel</Option>
              <Option value="general1">General</Option>
            </Select>
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="When they get the rank"
                name="wtgtr"
                rules={[{ required: true, message: "When they get the rank" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Job responsibility"
                name="jobresponsibility"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Job responsibility",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Form.Item label="Select Education Level" className="w-full">
              <Select>
                <Option value="10grade">10th Grade</Option>
                <Option value="twelfth">12th Grade</Option>
                <Option value="tvet">TVET</Option>
                <Option value="diploma">Diploma</Option>
                <Option value="bachelor">Bachelor's Degree</Option>
                <Option value="master">Master's Degree</Option>
                <Option value="phd">PhD</Option>
              </Select>
            </Form.Item>
          </Row>
          <Divider orientation="left">Evaluation</Divider>
          <Form.Item label="For Education Level 10%">
            <Row gutter={16}>
              <Col span={12}>
                <Slider
                  min={0}
                  max={10}
                  onChange={onChange1}
                  value={typeof inputValue1 === "number" ? inputValue1 : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={10}
                  style={{ margin: "0 16px" }}
                  step={0.01}
                  value={inputValue1}
                  //onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="For Service 15%">
            <Row gutter={16}>
              <Col span={12}>
                <Slider
                  min={0}
                  max={15}
                  onChange={onChange2}
                  value={typeof inputValue2 === "number" ? inputValue2 : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={15}
                  style={{ margin: "0 16px" }}
                  step={0.01}
                  value={inputValue2}
                  //onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="For Indication 25%">
            <Row gutter={16}>
              <Col span={12}>
                <Slider
                  min={0}
                  max={25}
                  onChange={onChange3}
                  value={typeof inputValue3 === "number" ? inputValue3 : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={25}
                  style={{ margin: "0 16px" }}
                  step={0.01}
                  value={inputValue3}
                  //onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="For Discipline 25%">
            <Row gutter={16}>
              <Col span={12}>
                <Slider
                  min={0}
                  max={25}
                  onChange={onChange4}
                  value={typeof inputValue4 === "number" ? inputValue4 : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={25}
                  style={{ margin: "0 16px" }}
                  step={0.01}
                  value={inputValue4}
                  //onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="For Work Performance 25%">
            <Row gutter={16}>
              <Col span={12}>
                <Slider
                  min={0}
                  max={25}
                  onChange={onChange5}
                  value={typeof inputValue5 === "number" ? inputValue5 : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={25}
                  style={{ margin: "0 16px" }}
                  step={0.01}
                  value={inputValue5}
                  //onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Total Value 100%">
            <Row gutter={16}>
              <Input readOnly value={total} />
            </Row>
          </Form.Item>
          <Form.Item label="Point Deduction for discipline">
            <Row gutter={16}>
              <Col span={12}>
                <Slider
                  min={0}
                  max={10}
                  onChange={onChange7}
                  value={typeof inputValue7 === "number" ? inputValue7 : 0}
                  step={0.01}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={10}
                  style={{ margin: "0 16px" }}
                  step={0.01}
                  value={inputValue7}
                  //onChange={onChange}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Final evaluation point 100%">
            <Row gutter={16}>
              <Input readOnly value={subtractedValue} />
            </Row>
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={onChange}>Approved</Checkbox>
            <Checkbox onChange={onChange}>Rejected</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      {/* <Table
        columns={columns}
        //   dataSource={dataSource}
        bordered
        pagination={false}
        style={{ marginTop: 16 }}
      /> */}
      <br />
      <br />
      <br />
      <div className="search-table-outter wrapper mb-11 shadow-md rounded-md border-l-4 border-blue-500  mt-5">
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
              <td>Current Rank</td>
              <td>Requested Rank</td>
              <td>When they get the rank</td>
              <td>Total Value</td>
              <td>Evaluation</td>
              <td>Action</td>
            </tr>
            {dataSource.map((data: any) => (
              <tr
                key={data.id}
                className="py-10 mb-10 text-slate-500"
                style={{ textAlign: "start", margin: 32 }}
              >
                <td>{data.currentRank}</td>
                <td>{data.requestedRank}</td>
                <td>{data.when}</td>
                <td>{data.totlaValue}</td>
                <td>{data.evaluation}</td>
                <td>{data.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meareg;
