// MyForm.tsx
import React, { useState } from 'react';
import { Form, Steps, message } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});

  

  const handleFormData = (data: any) => {
    setFormData((prevData: any) => ({ ...prevData, ...data }));
  };

  const steps = [
    {
      title: 'Step 1',
      content: <Step1 form={form} nextStep={() => nextStep()} handleFormData={handleFormData} />,
    },
    {
      title: 'Step 2',
      content: <Step2 form={form} nextStep={() => nextStep()} prevStep={() => prevStep()} handleFormData={handleFormData} />,
    },
    {
      title: 'Step 3',
      content: <Step3 form={form} prevStep={() => prevStep()} handleFormData={handleFormData} />,
    },
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    // form
    //   .validateFields()
    //   .then(() => {
    //     setCurrentStep(currentStep + 1);
    //   })
    //   .catch((error) => {
    //     console.error('Validation failed:', error);
    //   });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = () => {
    // Log the complete form data
    console.log('Complete Form Data:', formData);
    message.success('Form submitted successfully!');
  };

  return (
    <>
      <Steps current={currentStep} style={{padding: "0 24px"}}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Form layout="vertical" form={form} onFinish={onFinish} style={{padding:"24px"}}>
        <div style={{ margin: '16px 0' }}>{steps[currentStep].content}</div>
      </Form>
    </>
  );
};

export default MyForm;



