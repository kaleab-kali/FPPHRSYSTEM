// Step3.tsx
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Space,
  Row,
  Col,
  Radio,
} from "antd";
import { FormInstance } from "antd/lib/form";
import { data } from "../data";

const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface Step3Props {
  form: FormInstance<any>;
  prevStep: () => void;
  handleFormData: (data: any) => void;
}

const Step3: React.FC<Step3Props> = ({ form, prevStep, handleFormData }) => {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const [subcityOptions, setSubcityOptions] = useState<string[]>([]);
  const [woredaOptions, setWoredaOptions] = useState<string[]>([]);

  // Reset subcity and woreda when region changes
  useEffect(() => {
    setSubcity(null);
    setWoreda(null);
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    setWoreda(null);
  }, [subcity]);

  const handleRegionChange = (value: string) => {
    const firstSubcity = Object.keys(data[value])[0];
    setRegion(value);
    setSubcity(firstSubcity);
    setSubcityOptions(Object.keys(data[value]));
    setWoredaOptions(data[value][firstSubcity]);
    form.setFieldsValue({
      subcity: firstSubcity,
      wordea: data[value][firstSubcity][0],
    });
  };

  const handleSubcityChange = (value: string) => {
    const firstWoreda = data[region!][value][0];
    setSubcity(value);
    setWoreda(firstWoreda);
    setWoredaOptions(data[region!][value]);
    form.setFieldsValue({ wordea: firstWoreda });
  };
  const [maritalStatus, setMaritalStatus] = useState<string>("single");

  const handleMaritalStatusChange = (value: string) => {
    setMaritalStatus(value);
  };

  return (
    <>
      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Emergency Contact Information
          </span>
        }
        name="emergencyContact"
      >
        {/* Sub-form for Emergency Contact Information */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="First Name"
              name={["emergencyContact", "firstName"]}
              rules={[
                { required: true, message: "Please enter the first name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Middle Name"
              name={["emergencyContact", "middleName"]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Last Name"
              name={["emergencyContact", "lastName"]}
              rules={[
                { required: true, message: "Please enter the last name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Relationship"
              name={["emergencyContact", "relationship"]}
              rules={[
                { required: true, message: "Please select the relationship" },
              ]}
            >
              <Select>
                <Option value="spouse">Spouse</Option>
                <Option value="sibling">Sibling</Option>
                <Option value="parent">Parent</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name={["emergencyContact", "phoneNumber"]}
              rules={[
                { required: true, message: "Please enter the phone number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Email" name={["emergencyContact", "email"]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Emergency Contact Address"
          name={["emergencyContact", "address"]}
        >
          {/* Sub-form for Address */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Region" name="region">
                <Select
                  options={Object.keys(data).map((region) => ({
                    label: region,
                    value: region,
                  }))}
                  onChange={handleRegionChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Zone/Subcity" name="subcity">
                <Select
                  options={subcityOptions.map((subcity) => ({
                    label: subcity,
                    value: subcity,
                  }))}
                  onChange={handleSubcityChange}
                  value={subcity}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Woreda" name="wordea">
                <Select
                  options={woredaOptions.map((woreda) => ({
                    label: woreda,
                    value: woreda,
                  }))}
                  value={woreda}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Leyu Bota"
                name={["emergencyContact", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="House Number"
                name={["emergencyContact", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Marital Status"
        name="maritalStatus"
        initialValue="single"
      >
        <Select onChange={handleMaritalStatusChange}>
          <Option value="married">Married</Option>
          <Option value="single">Single</Option>
          <Option value="divorced">Divorced</Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.maritalStatus !== currentValues.maritalStatus
        }
      >
        {({ getFieldValue }) => {
          const currentStatus = getFieldValue("maritalStatus");

          return (
            <>
              {currentStatus === "married" && (
                <Form.Item label="Spouse Information" name="spouseInfo">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="First Name"
                        name={["spouseInfo", "firstName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Middle Name"
                        name={["spouseInfo", "middleName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Last Name"
                        name={["spouseInfo", "lastName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Date of Birth"
                        name={["spouseInfo", "dob"]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Phone Number"
                        name={["spouseInfo", "phoneNumber"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Address"
                    name={["spouseInfo", "address", "currentAddress"]}
                  >
                    {/* Sub-form for Spouse Address */}
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Region"
                          name={["spouseInfo", "address", "region"]}
                        >
                          <Select>{/* Options for Region */}</Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Subcity"
                          name={["spouseInfo", "address", "subcity"]}
                        >
                          <Select>{/* Options for Subcity */}</Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form.Item>
              )}

              {currentStatus === "divorced" && (
                <Form.Item label="Divorced Information" name="divorcedInfo">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Divorce Date"
                        name={["divorcedInfo", "divorceDate"]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    {/* ... (add other divorced fields) */}
                  </Row>
                </Form.Item>
              )}
            </>
          );
        }}
      </Form.Item>

      {/* <Form.Item
        label="የስራ አፈፃፀም ውጤት"
        name="workPerformance"
        rules={[{ required: true, message: "Work Performance is required" }]}
      >
        
        <Input />
      </Form.Item> */}

      <Space>
        <Button type="primary" className=" bg-blue-600" onClick={prevStep}>
          Previous
        </Button>
        <Button type="primary" className=" bg-blue-600" htmlType="submit">
          Submit
        </Button>
      </Space>
    </>
  );
};

export default Step3;
