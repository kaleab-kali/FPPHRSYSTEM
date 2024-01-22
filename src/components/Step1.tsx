// Step1.tsx
import React, { useEffect, useState } from "react";
import { Form, Select, Input, Radio, DatePicker, Button, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";
import { data } from "../data";
import moment from "moment";

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

  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({currentAddress: { subcity: firstSubcity } });

      const woredas = data[region][firstSubcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({
        currentAddress: { woreda: firstWoreda  },
      });
    }
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    if (region && subcity) {
      const woredas = data[region][subcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({ currentAddress: {woreda: firstWoreda} });
    }
  }, [subcity]);

  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handleSubcityChange = (value: string) => {
    setSubcity(value);
  };
  const handleDatePickerChange = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    form.setFieldsValue({ birthday: date }); // Set the moment object directly
  };

  return (
    <>
      {/* first row */}
      <Row gutter={16}>
        <Col span={6}>
          {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
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
          {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
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
            <DatePicker
              style={{ width: "100%" }}
              onChange={()=>handleDatePickerChange}
            />
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
          <Radio value="other">Other</Radio>
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
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        // rules={[{ required: true, message: "Please upload your photo" }]}
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
              <Form.Item
                name={["phoneNumber", "prefix"]}
                initialValue="+251"
                noStyle
              >
                <Input style={{ width: "20%" }} readOnly />
              </Form.Item>
              {/* Phone number input */}
              <Form.Item
                name={["phoneNumber", "number"]}
                noStyle
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  // You can add more validation rules for the phone number format
                  // Example: { pattern: /^[0-9]{9,11}$/, message: "Invalid phone number" }
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
        // name="currentAddress"
      >
        <>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Region" name={["currentAddress", "region"]}>
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
              <Form.Item
                label="Zone/Subcity"
                name={["currentAddress", "subcity"]}
              >
                <Select
                  options={
                    region
                      ? Object.keys(data[region]).map((subcity) => ({
                          label: subcity,
                          value: subcity,
                        }))
                      : []
                  }
                  onChange={handleSubcityChange}
                  value={subcity}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Woreda" name={["currentAddress", "woreda"]}>
                <Select
                  options={
                    region && subcity
                      ? data[region][subcity].map((woreda) => ({
                          label: woreda,
                          value: woreda,
                        }))
                      : []
                  }
                  value={woreda}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="House Number"
                name={["currentAddress", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Leyu Bota"
                name={["currentAddress", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Camp" name={["currentAddress", "camp"]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
        {/* Sub-form for Current Address */}
      </Form.Item>

      <Button
        type="primary"
        onClick={nextStep}
        style={{ background: "#1890ff", borderColor: "#1890ff" }}
      >
        Next
      </Button>
    </>
  );
};

export default Step1;