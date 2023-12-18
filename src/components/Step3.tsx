// Step3.tsx
import React, { useState } from "react";
import { Form, Input, Select, Button, DatePicker, Space, Row, Col, Radio } from "antd";
import { FormInstance } from "antd/lib/form";

const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface Step3Props {
  form: FormInstance<any>;
  prevStep: () => void;
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

const Step3: React.FC<Step3Props> = ({ form, prevStep, handleFormData }) => {
  const [selectedBirthplaceSubcity, setSelectedBirthplaceSubcity] = useState<
    string | undefined
  >(undefined);
  const [maritalStatus, setMaritalStatus] = useState<string>('single');

  const handleMaritalStatusChange = (value: string) => {
    setMaritalStatus(value);
  };

  const woredasBySubcity: Record<string, string[]> = {
    "Addis Ketema": ["Woreda 1", "Woreda 2", "Woreda 3"],
    "Arada": ["Woreda 4", "Woreda 5", "Woreda 6"],
    "Bole": ["Woreda 9", "Woreda 10", "Woreda 11"],
    // Add other subcities and their corresponding woredas
  };
  const handleBirthplaceSubcityChange = (value: string) => {
    // Update the state when the subcity changes
    setSelectedBirthplaceSubcity(value);
  };

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>Birthplace Information</span>} name="birthplaceInfo">
        {/* Sub-form for Birthplace Information */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Region" name="birthplaceRegion">
              <Select options={regionOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Subcity" name="birthplaceSubcity">
              <Select
                options={subcityOptions}
                onChange={handleBirthplaceSubcityChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Woreda" name="birthplaceWoreda">
          <Select>
            {selectedBirthplaceSubcity &&
              woredasBySubcity[selectedBirthplaceSubcity]?.map((woreda) => (
                <Option key={woreda} value={woreda}>
                  {woreda}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Leyu Bota" name="birthplaceLeyuBota">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Camp" name="birthplaceCamp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="House Number" name="birthplaceHouseNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>Emergency Contact Information</span>} name="emergencyContact">
        {/* Sub-form for Emergency Contact Information */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="First Name"
              name={["emergencyContact", "firstName"]}
              rules={[
                { required: true, message: "Please enter the first name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Middle Name"
              name={["emergencyContact", "middleName"]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Last Name"
              name={["emergencyContact", "lastName"]}
              rules={[
                { required: true, message: "Please enter the last name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Relationship"
              name={["emergencyContact", "relationship"]}
              rules={[
                { required: true, message: "Please select the relationship" },
              ]}
            >
              <Select>
                <Option value="spouse">Spouse</Option>
                <Option value="sibling">Sibling</Option>
                <Option value="parent">Parent</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name={["emergencyContact", "phoneNumber"]}
              rules={[
                { required: true, message: "Please enter the phone number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Email" name={["emergencyContact", "email"]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Address" name={["emergencyContact", "address"]}>
          {/* Sub-form for Address */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Region" name={["emergencyContact", "region"]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Zone" name={["emergencyContact", "zone"]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Woreda" name={["emergencyContact", "woreda"]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Leyu Bota"
                name={["emergencyContact", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="House Number"
                name={["emergencyContact", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form.Item>

      <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>Education Level</span>} name="educationLevel">
        {/* Add your education level fields here */}
        <Select>
          <Option value="10th">10th grade</Option>
          <Option value="12th">12th grade</Option>
          <Option value="TVET">TVET</Option>
          <Option value="Diploma">Diploma</Option>
          <Option value="Bachelor">Bachelor's Degree</Option>
         
        </Select>
      </Form.Item>

      {form.getFieldValue("educationLevel") === "Bachelor" && (
        <>
          <Form.Item label="Graduated University" name="graduatedUniversity">
            <Input placeholder="University Name" />
          </Form.Item>

          <Form.Item label="Graduation Year" name="graduationYear">
            <Input type="number" placeholder="Graduation Year" />
          </Form.Item>

          <Form.Item label="Field of Study" name="fieldOfStudy">
            <Input placeholder="Field of Study" />
          </Form.Item>
        </>
      )}

     

      <Form.Item label="Marital Status" name="maritalStatus" initialValue="single">
        <Select onChange={handleMaritalStatusChange}>
          <Option value="married">Married</Option>
          <Option value="single">Single</Option>
          <Option value="divorced">Divorced</Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.maritalStatus !== currentValues.maritalStatus}
      >
        {({ getFieldValue }) => {
          const currentStatus = getFieldValue('maritalStatus');

          return (
            <>
              {currentStatus === 'married' && (
                <Form.Item label="Spouse Information" name="spouseInfo">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="First Name" name={['spouseInfo', 'firstName']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Middle Name" name={['spouseInfo', 'middleName']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Last Name" name={['spouseInfo', 'lastName']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Date of Birth" name={['spouseInfo', 'dob']}>
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Phone Number" name={['spouseInfo', 'phoneNumber']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    
                  </Row>
                  
                  
                      <Form.Item label="Address" name={['spouseInfo', 'address', 'currentAddress']}>
                        {/* Sub-form for Spouse Address */}
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item label="Region" name={['spouseInfo', 'address', 'region']}>
                              <Select>
                                {/* Options for Region */}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item label="Subcity" name={['spouseInfo', 'address', 'subcity']}>
                              <Select>
                                {/* Options for Subcity */}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                       
                      </Form.Item>
                 
                </Form.Item>
              )}

              {currentStatus === 'divorced' && (
                <Form.Item label="Divorced Information" name="divorcedInfo">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Divorce Date" name={['divorcedInfo', 'divorceDate']}>
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    {/* ... (add other divorced fields) */}
                  </Row>
                </Form.Item>
              )}
            </>
          );
        }}
      </Form.Item>

{/* 
      <Form.Item
        label="የስራ አፈፃፀም ውጤት"
        name="workPerformance"
        rules={[{ required: true, message: "Work Performance is required" }]}
      >
        <Input />
      </Form.Item> */}

    


      <Space>
        <Button type="default" className="bg-blue-600 text-blue-100 "  onClick={prevStep}>
          Previous
        </Button>
        <Button type="default" className="bg-blue-600 text-blue-100 "  htmlType="submit">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default Step3;
