import React, { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Modal,
  FloatButton,
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  AutoComplete,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { data2 } from "../../../../data2";
import getAge from "../../../../util/ageCal";
import form, { FormInstance } from "antd/lib/form";
import { EmployeeData } from "../../../../types/employeeData";
import { useUpdateEmployee } from "../../../../services/mutations";

interface MotherIfnoProps {
  selectedEmployee?: EmployeeData; // Make selectedEmployee optional
}

function MotherIfno({ selectedEmployee }: MotherIfnoProps) {

  const { Title, Text } = Typography;
  const { Option } = Select;
// State to track the visibility of each edit modal

  const [motherInfoEditModalVisible, setEditMotherInfoModalVisible] =
    React.useState(false);

  const handleToggleMotherInfoEditModal = () => {
    setEditMotherInfoModalVisible(!motherInfoEditModalVisible);
  };

  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields(); // This will validate all fields and return the values
      console.log(JSON.stringify(values));
      // You can now use the values to update the employee
      if (values) {
        updateEmployeeMutuation.mutate({ ...selectedEmployee, ...values });
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  return (
    <div className="">
      {/* <ToastContainer /> */}
      <div className="gIwrapper flex flex-col space-y-10">
        <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
          <Title style={{ fontSize: 24 }}>Mother's Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                First Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.motherInformation.firstName}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Middle Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.motherInformation?.middleName}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Last Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.motherInformation.lastName}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Phone Number
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.motherInformation.phoneNumber.number}
              </Title>
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleToggleMotherInfoEditModal}
            className=" float-right bg-blue-500"
          >
            Edit
          </Button>
          <Modal
            title="Edit Mother's Information"
            visible={motherInfoEditModalVisible}
            onCancel={handleToggleMotherInfoEditModal}
            footer={null}
          >
            <Form
              name="editMotherInfo"
              initialValues={selectedEmployee}
              form={form}
              onFinish={handleFormSubmit}
            >
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item
                    label="Mother's First Name"
                    name={["motherInformation", "firstName"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mother's first name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Mother's Middle Name"
                    name={["motherInformation", "middleName"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mother's middle name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Mother's Last Name"
                    name={["motherInformation", "lastName"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mother's last name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  {/* Input Group for Phone Number */}
                  <Form.Item
                    label="Mother's Phone Number"
                    name={["motherInformation", "phoneNumber"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mother's phone number",
                      },
                    ]}
                  >
                    <Input.Group compact>
                      {/* Ethiopian country code */}
                      <Form.Item
                        name={["motherInformation", "phoneNumber", "prefix"]}
                        noStyle
                        initialValue="+251"
                      >
                        <Input style={{ width: "20%" }} readOnly />
                      </Form.Item>
                      {/* Phone number input */}
                      <Form.Item
                        name={["motherInformation", "phoneNumber", "number"]}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please enter your mother's phone number",
                          },
                        ]}
                      >
                        <Input style={{ width: "80%" }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                htmlType="submit"
                // onClick={handleFormSubmit}
                style={{ background: "#1890ff", borderColor: "#1890ff" }}
              >
                Save
              </Button>
              <Button type="default" className="ml-3">
                Cancel
              </Button>
            </Form>
          </Modal>
        </div>
      </div>
      '
    </div>
  );
}

export default MotherIfno;
