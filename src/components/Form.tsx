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
      <Steps current={currentStep}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div style={{ margin: '16px 0' }}>{steps[currentStep].content}</div>
      </Form>
    </>
  );
};

export default MyForm;



// import React, { useState } from 'react';
// import { Form, Input, Select, Button, DatePicker, Checkbox, Radio, message } from 'antd';
// import { FormInstance } from 'antd/lib/form';
// import { Space } from 'antd/lib';

// const { Option } = Select;

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const MyForm: React.FC = () => {
//   const [form] = Form.useForm();
//   const [currentStep, setCurrentStep] = useState<number>(1);

//   const onFinish = (values: any) => {
//     console.log('Received values:', values);
//     message.success('Form submitted successfully!');
//   };

//   const nextStep = () => {
//     form
//     .validateFields()
//     .then(() => {
//       setCurrentStep(currentStep + 1);
//     })
//     .catch((error) => {
//       console.error('Validation failed:', error);
//     });
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   return (
//     <Form  layout="vertical" form={form} onFinish={onFinish} initialValues={{ gender: 'male' }}>
//       {currentStep === 1 && (
//         <>
//         <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter Title of the person' }]}>
//             <Select>
//               <Option value="ato">Ato</Option>
//               <Option value="dr">Dr</Option>
//               <Option value="Sajen">ሳጅን</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Middle Name" name="middleName">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
//             <Input />
//           </Form.Item>
         
        
       
        
//           <Form.Item {...tailLayout}>
//             <Button type="primary" onClick={nextStep}>
//               Next
//             </Button>
//           </Form.Item>
//         </>
//       )}

//       {currentStep === 2 && (
//         <>
//         {/* Step 2 fields */}
//         <Form.Item label="Education History" name="educationHistory" rules={[{ required: true, message: 'Education History is required' }]}>
//           <Input.TextArea />
//         </Form.Item>
    
//         <Form.Item {...tailLayout}>
//           <Button type="primary" onClick={prevStep}>
//             Previous
//           </Button>
//           <Space />
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </>
//       )}
//     </Form>
//   );
// };

// export default MyForm;
