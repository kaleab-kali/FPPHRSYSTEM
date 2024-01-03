import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Radio,
  Modal,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const RewardInformation: React.FC = () => {
  const [form] = Form.useForm();
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
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const investigationResultsOptions = [
    { label: "Pass", value: "pass" },
    { label: "Failed", value: "failed" },
  ];

  return (
    <div className="flex w-full">
      <div className="flex flex-row justify-end items-end ml-60">
        <Button onClick={() => showModal()}>
          <PlusOutlined />
          Add
        </Button>
      </div>

      <Modal
        title="Reward"
        visible={isModalVisible}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            title: "",
            firstName: "",
            lastName: "",
            gender: "",
            educationReadiness: 0,
            averagePoint: 0,
            workExperience: 0,
            workEfficiency: 0,
            documentClarity: 0,
            investigationResult: "pass",
          }}
        >
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item label="Title" name="title">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter first name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Col span={12}>
            <Form.Item label="Gender" name="gender">
              <Select options={genderOptions} />
            </Form.Item>
          </Col>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Education Readiness"
                name="educationReadiness"
                rules={[
                  {
                    required: true,
                    message: "Please enter education readiness!",
                  },
                ]}
              >
                <InputNumber min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Average Point"
                name="averagePoint"
                rules={[
                  { required: true, message: "Please enter average point!" },
                ]}
              >
                <InputNumber min={0} max={100} />
              </Form.Item>
            </Col>
          </Row>
          <Col span={8}>
            <Form.Item
              label="Work Experience"
              name="workExperience"
              rules={[
                { required: true, message: "Please enter work experience!" },
              ]}
            >
              <InputNumber min={0} max={100} />
            </Form.Item>
          </Col>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Work Efficiency"
                name="workEfficiency"
                rules={[
                  { required: true, message: "Please enter work efficiency!" },
                ]}
              >
                <InputNumber min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Document Clarity"
                name="documentClarity"
                rules={[
                  { required: true, message: "Please enter document clarity!" },
                ]}
              >
                <InputNumber min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Investigation Result"
                name="investigationResult"
              >
                <Radio.Group options={investigationResultsOptions} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RewardInformation;
