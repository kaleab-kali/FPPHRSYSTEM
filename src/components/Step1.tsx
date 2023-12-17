// Step1.tsx
import React, { useState } from "react";
import { Form, Select, Input, Radio, DatePicker, Button, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";

const { Option } = Select;

interface Step1Props {
  form: FormInstance<any>;
  nextStep: () => void;
  handleFormData: (data: any) => void;
}

const subcityOptions = [
  { label: "Addis Ketema", value: "Addis Ketema" },
  { label: "Akaky Kaliti", value: "Akaky Kaliti" },
  { label: "Arada", value: "Arada" },
  { label: "Bole", value: "Bole" },
  { label: "Gullele", value: "Gullele" },
  { label: "Kirkos", value: "Kirkos" },
  { label: "Kolfe Keranio", value: "Kolfe Keranio" },
  { label: "Lideta", value: "Lideta" },
  { label: "Nifas Silk-Lafto", value: "Nifas Silk-Lafto" },
  { label: "Yeka", value: "Yeka" },
];

const regionOptions = [
  { label: "Tigray", value: "Tigray" },
  { label: "Afar", value: "Afar" },
  { label: "Amhara", value: "Amhara" },
  { label: "Oromia", value: "Oromia" },
  { label: "Somali", value: "Somali" },
  { label: "Benishangul-Gumuz", value: "Benishangul-Gumuz" },
  {
    label: "Southern Nations, Nationalities, and Peoples' Region (SNNPR)",
    value: "SNNPR",
  },
  { label: "Harari", value: "Harari" },
  { label: "Addis Ababa", value: "Addis Ababa" },
];

// Define a mapping of subcities to their corresponding wordeas
// const subcityWoredaMapping: Record<string, string[]> = {
//   "Addis Ketema": ["Woreda1", "Woreda2", "Woreda3"], // Add the corresponding wordeas
//   "Akaky Kaliti": ["WoredaA", "WoredaB", "WoredaC"], // Add the corresponding wordeas
//   // ... Add mappings for other subcities
// };

const Step1: React.FC<Step1Props> = ({ form, nextStep, handleFormData }) => {
    const [selectedSubcity, setSelectedSubcity] = useState<string | undefined>(undefined);

    // Static list of woredas for each subcity
    const woredasBySubcity: Record<string, string[]> = {
      'Addis Ketema': ['Woreda 1', 'Woreda 2', 'Woreda 3'],
      'Arada': ['Woreda 4', 'Woreda 5', 'Woreda 6'],
      'Bole': ['Woreda 9', 'Woreda 10', 'Woreda 11'],
      // Add other subcities and their corresponding woredas
    };
  
    const handleSubcityChange = (value: string) => {
      setSelectedSubcity(value);
    };

  return (
    <>
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

      <Row gutter={16}>
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
          <Form.Item label="Middle Name" name="middleName">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Position"
        name="position"
        rules={[{ required: true, message: "Please enter your position" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "Please upload your photo" }]}
      >
        <Input type="file" />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[{ required: true, message: "Please enter your department" }]}
      >
        <Input />
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

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Birthday"
        name="birthday"
        rules={[{ required: true, message: "Please select your birthday" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>Current Address</span>} name="currentAddress">
        {/* Sub-form for Current Address */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Region" name="region">
              <Select options={regionOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Subcity" name="subcity">
              <Select options={subcityOptions} onChange={handleSubcityChange} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Woreda" name="wordea">
        <Select>
          {selectedSubcity &&
            woredasBySubcity[selectedSubcity]?.map((woreda) => (
              <Option key={woreda} value={woreda}>
                {woreda}
              </Option>
            ))}
        </Select>
        </Form.Item>

        <Row gutter={16}>
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
          <Col span={8}>
            <Form.Item label="House Number" name="houseNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>

      </Form.Item>

      <Button type="primary" onClick={nextStep}>
        Next
      </Button>
    </>
  );
};

export default Step1;
