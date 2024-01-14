import React, { useEffect, useState } from "react";
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
// import { Row, Col, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { data } from "../../../../data";
import getAge from "../../../../util/ageCal";
import form, { FormInstance } from "antd/lib/form";
import { EmployeeData } from "../../../../types/employeeData";
import { useUpdateEmployee } from "../../../../services/mutations";

interface GeneralInformationProps {
  selectedEmployee?: EmployeeData; // Make selectedEmployee optional
}

function GeneralInfo({ selectedEmployee }: GeneralInformationProps) {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

      const woredas = data[region][firstSubcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({
        currentAddress: { woreda: firstWoreda },
      });
    }
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    if (region && subcity) {
      const woredas = data[region][subcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
    }
  }, [subcity]);


  const { Title, Text } = Typography;
  const { Option } = Select;

  // State to track the visibility of each edit modal
  const [generalEditModalVisible, setEditGeneralModalVisible] =
    React.useState(false);


  // Handler to toggle the visibility of the edit modal for each card
  const handleToggleGeneralEditModal = () => {
    setEditGeneralModalVisible(!generalEditModalVisible);
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
      <div className="gIwrapper flex flex-col space-y-10">
        <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
          <Title style={{ fontSize: 24 }}>General Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Title
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.title}</Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                First Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.firstName}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Middle Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.middleName}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Last Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.lastName}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Age
              </Title>
              <Title style={{ fontSize: 16 }}>
                {/* {getAge(selectedEmployee?.birthday)} */}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Gender
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.gender}</Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Phone
              </Title>
              <Title style={{ fontSize: 16 }}>
                {" "}
                {selectedEmployee?.phoneNumber.number}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Email
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.email}</Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Position
              </Title>
              <Title style={{ fontSize: 16 }}>
                {" "}
                {selectedEmployee?.position}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Department
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.department}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Ethnicity
              </Title>
              <Title style={{ fontSize: 16 }}>
                {" "}
                {selectedEmployee?.ethnicity}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Salary
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.salary}</Title>
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleToggleGeneralEditModal}
            className=" float-right bg-blue-500"
          >
            Edit
          </Button>
          <Modal
            title="Edit General Information"
            visible={generalEditModalVisible}
            onCancel={handleToggleGeneralEditModal}
            footer={null}
          >
            <Form
              name="editGeneralInfoForm"
              initialValues={selectedEmployee}
              form={form}
              onFinish={handleFormSubmit}
              // onFinish={handleFormSubmit} // Uncomment and provide your form submit handler
            >
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please select a title" },
                    ]}
                  >
                    <Select>
                      <Option value="ato">Ato</Option>
                      <Option value="doctor">Doctor</Option>
                      {/* Add other 14 levels as needed */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Middle Name" name="middleName">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              {/* second Row */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col span={16}>
                  <Form.Item
                    label="Birthday"
                    name="birthday"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birthday",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col> */}
              </Row>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[
                      { required: true, message: "Please enter your position" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your department",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Form.Item
                label="Photo"
                name="photo"
                rules={[
                  { required: true, message: "Please upload your photo" },
                ]}
              >
                <Input type="file" />
              </Form.Item> */}

              <Form.Item
                label="Ethnicity"
                name="ethnicity"
                rules={[
                  {
                    required: true,
                    message: "Please enter your ethnicity",
                  },
                ]}
              >
                <Select placeholder="Select Ethnicity">
                  <Option value="Amhara">Amhara</Option>
                  <Option value="Afar">Afar</Option>
                  <Option value="Oromo">Oromo</Option>
                  <Option value="Tigray">Tigray</Option>
                  <Option value="Somale">Somale</Option>
                  <Option value="Gurage">Gurage</Option>
                  <Option value="Wolyaita">Wolyaita</Option>
                  <Option value="Gambela">Gambela</Option>
                  <Option value="Gumuz">Gumuz</Option>
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input.Group compact>
                      <Form.Item name={["phoneNumber", "number"]} noStyle>
                        <Input style={{ width: "80%" }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                // onClick={()=>handleFormSubmit()}
                htmlType="submit"
                style={{ background: "#1890ff", borderColor: "#1890ff" }}
              >
                Save
              </Button>
              <Button
                type="default"
                // onClick={handleFormSubmit}
                className="ml-3"
              >
                Cancel
              </Button>
            </Form>
          </Modal>
        </div>
        
      </div>
    </div>
  );
}

export default GeneralInfo;
