// Step2.tsx
import React, { useState } from "react";
import { Form, Input, DatePicker, Radio, Select, Button,Space, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";
import Title from "antd/es/typography/Title";


const { Option } = Select;

interface Step2Props {
  form: FormInstance<any>;
  prevStep: () => void;
  nextStep: () => void;
  handleFormData: (data: any) => void;
}

const Step2: React.FC<Step2Props> = ({ form, nextStep, prevStep, handleFormData }) => {
    
    const onFinish = (values: any) => {
      handleFormData(values); // Collect and pass the form data
      nextStep();
    };
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleRewardStatusChange = (value: string) => {
    setShowAdditionalFields(value === "yes");
  };

  return (
    <>
      <Form.Item
        label="Salary"
        name="salary"
        rules={[{ required: true, message: "Please enter the salary" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Retirement Date"
        name="retirementDate"
        rules={[
          { required: true, message: "Please select the retirement date" },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
{/* 
      <Form.Item
        label="Reward Date"
        name="rewardDate"
        rules={[{ required: true, message: "Please select the reward date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item> */}
{/* 
      <Form.Item
        label="የዋስትና ሁኔታ"
        name="rewardStatus"
        rules={[{ required: true, message: "Please select the reward status" }]}
      >
        <Radio.Group onChange={(e) => handleRewardStatusChange(e.target.value)}>
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
              { required: true, message: "Please enter the wastena location" },
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
      )} */}
         <Title level={4}>Mother's Information</Title>
         <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Mother's First Name"
            name="motherFirstName"
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
        <Col span={8}>
          <Form.Item
            label="Mother's Middle Name"
            name="motherMiddleName"
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
        <Col span={8}>
          <Form.Item
            label="Mother's Last Name"
            name="motherLastName"
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
            name="motherPhoneNumber"
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
                name={['phone', 'prefix']}
                noStyle
                initialValue="+251"
              >
                <Input style={{ width: '20%' }} readOnly />
              </Form.Item>
              {/* Phone number input */}
              <Form.Item
                name={['phone', 'number']}
                noStyle
                rules={[{ required: true, message: 'Please enter your mother\'s phone number' }]}
              >
                <Input style={{ width: '80%' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>


<Space>
    <Button type="default" className="bg-blue-600 text-blue-100 "  onClick={prevStep}>
      Previous
    </Button>
    <Button type="default" className="bg-blue-600 text-blue-100 "  onClick={nextStep}>
      Next
    </Button>
  </Space>
    </>
  );
};

export default Step2;
