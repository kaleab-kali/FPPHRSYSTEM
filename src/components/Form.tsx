import React, { useEffect, useState } from "react";
import { Form, Steps, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const { Step } = Steps;
let idCounter = 1;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleFormData = (data: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...data,
      birthday: data.birthday ? data.birthday.format("DD/MM/YYYY"): undefined, // Format the birthday
    }));
  };

  const queryClient = useQueryClient();

  const replacer = (key: string, value: any) => {
    // Check for circular references and replace them with a string representation
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return "[Circular Reference]";
      }
      cache.add(value);
    }
    return value;
  };
  const cache = new Set();

  // const addEmployeeMutation = useMutation(
  //   async (data: any) => {
  //     const response = await fetch("http://localhost:8000/employees", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data, replacer),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add employee");
  //     }
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("employees");
  //       message.success("Form submitted successfully!");
  //     },
  //   }
  // );

  const steps = [
    {
      title: "Step 1",
      content: (
        <Step1
          form={form}
          nextStep={() => nextStep()}
          handleFormData={handleFormData}
        />
      ),
    },
    {
      title: "Step 2",
      content: (
        <Step2
          form={form}
          nextStep={() => nextStep()}
          prevStep={() => prevStep()}
          handleFormData={handleFormData}
        />
      ),
    },
    {
      title: "Step 3",
      content: (
        <Step3
          form={form}
          prevStep={() => prevStep()}
          handleFormData={handleFormData}
        />
      ),
    },
  ];

  const nextStep = () => {
    const values = form.getFieldsValue(true);
  
  // Update the formData state variable
  handleFormData(values);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async () => {
    const values = form.getFieldsValue(true);
  
    // Generate a unique ID in the format of "FPC-0001"
    const uniqueId = `FPC-${String(idCounter).padStart(4, '0')}`;
  
    // Increment the counter for the next ID
    idCounter += 1;
  
    // Add the unique ID to the form data
    values.id = uniqueId;
  
    // Pass the form values to handleFormData
    handleFormData(values);
    try {
      await form.validateFields();
      // Use the getFieldsValue method to get only the form data
      // const formData = form.getFieldsValue();
      // const currentFormData = form.getFieldsValue();
      // await addEmployeeMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
    console.log("Complete Form Data:", formData);
    message.success("Form submitted successfully!");
  };

  return (
    <>
      <Steps current={currentStep} style={{ padding: "0 24px" }}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ padding: "24px" }}
      >
        <div style={{ margin: "16px 0" }}>{steps[currentStep].content}</div>
      </Form>
    </>
  );
};
export default MyForm;