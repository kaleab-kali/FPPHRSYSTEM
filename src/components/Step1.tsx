// Step1.tsx
import React, { useEffect, useState } from "react";
import { Form, Select, Input, Radio, DatePicker, Button, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";
import { data } from "../data";

const { Option } = Select;

interface Step1Props {
  form: FormInstance<any>;
  nextStep: () => void;
  handleFormData: (data: any) => void;
}

const Step1: React.FC<Step1Props> = ({ form, nextStep, handleFormData }) => {
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

  return (
    <>
      {/* first row */}
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please select a title" }]}
          >
            <Select>
              <Option value="ato">Ato</Option>
              <Option value="doctor">Doctor</Option>
              {/* Add other 14 levels as needed */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
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
        <Col span={9}>
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
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please select your birthday" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please enter your position" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please enter your department" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "Please upload your photo" }]}
      >
        <Input type="file" />
      </Form.Item>

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
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input.Group compact>
              {/* Ethiopian country code */}
              <Form.Item name={["phone", "prefix"]} noStyle initialValue="+251">
                <Input style={{ width: "20%" }} readOnly />
              </Form.Item>
              {/* Phone number input */}
              <Form.Item
                name={["phone", "number"]}
                noStyle
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Current Address
          </span>
        }
        name="currentAddress"
      >
        {/* Sub-form for Current Address */}
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
            <Form.Item label="House Number" name="houseNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Leyu Bota" name="leyuBota">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Camp" name="camp">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}></Row>
      </Form.Item>

      <Button type="primary" className=" bg-blue-600" onClick={nextStep}>
        Next
      </Button>
    </>
  );
};

export default Step1;
