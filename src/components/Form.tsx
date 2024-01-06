import React, { useState } from "react";
import { Form, Steps, message } from "antd";
import { useMutation, useQueryClient } from "react-query";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const { Step } = Steps;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});

  const handleFormData = (data: any) => {
    setFormData((prevData: any) => ({ ...prevData, ...data }));
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

  const addEmployeeMutation = useMutation(
    async (data: any) => {
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, replacer),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
        message.success("Form submitted successfully!");
      },
    }
  );

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
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async () => {
    try {
      await form.validateFields();
      // Use the getFieldsValue method to get only the form data
      // const formData = form.getFieldsValue();
      // const currentFormData = form.getFieldsValue();
      await addEmployeeMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
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