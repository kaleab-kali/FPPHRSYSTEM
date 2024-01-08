import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Radio, Modal } from 'antd';
import { PlusCircleFilled } from "@ant-design/icons";

const PerformanceInformation: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const investigationResultsOptions = [
    { label: 'Pass', value: 'pass' },
    { label: 'Failed', value: 'failed' },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    setIsModalVisible(false);
  };

  const calculateTotal = () => {
    const values = form.getFieldsValue();
    const total = Object.values(values).reduce(
      (acc: number, currentValue: any) => {
        if (typeof currentValue === 'number' && !isNaN(currentValue)) {
          return acc + currentValue;
        }
        return acc;
      },
      0
    );
    return total;
  };
  
  

  return (
    <div className="flex flex-col w-full">
      <Modal
        title="Performance Information"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okType="default"
      >
        <Form
          layout="vertical"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            title: '',
            firstName: '',
            lastName: '',
            gender: '',
            educationReadiness: 0,
            averagePoint: 0,
            workExperience: 0,
            workEfficiency: 0,
            documentClarity: 0,
            investigationResult: 'pass',
          }}
          onFinish={onFinish}
        >
      <Row gutter={16}>
        <Col >
          <Form.Item
            label="Education Readiness"
            name="educationReadiness"
            rules={[{ required: true, message: 'Please enter education readiness!' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Col>
        <Col >
          <Form.Item
            label="Average Point"
            name="averagePoint"
            rules={[{ required: true, message: 'Please enter average point!' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Col>
        <Col >
          <Form.Item
            label="Work Experience"
            name="workExperience"
            rules={[{ required: true, message: 'Please enter work experience!' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Work Efficiency"
            name="workEfficiency"
            rules={[{ required: true, message: 'Please enter work efficiency!' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Document Clarity"
            name="documentClarity"
            rules={[{ required: true, message: 'Please enter document clarity!' }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Investigation Result" name="investigationResult">
            <Radio.Group options={investigationResultsOptions} />
          </Form.Item>
        </Col>
        <Col>
        <Input
  value={calculateTotal() as number}
  addonBefore="Total"
  readOnly
  style={{ marginBottom: 16 }}
/>
        </Col>
      </Row>
        </Form>
      </Modal>
      <div className="ml-auto mb-4">
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#fff",
      cursor: "pointer",
    }}
    onClick={() => showModal()}
  >
    <PlusCircleFilled style={{ fontSize: 36, color: "#1980ff" }} />
  </div>
</div>
    </div>
  );
}

export default PerformanceInformation;