// Step2.tsx
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Radio,
  Select,
  Button,
  Space,
  Row,
  Col,
  AutoComplete,
} from "antd";
import { FormInstance } from "antd/lib/form";
import Title from "antd/es/typography/Title";
import { data } from "../data";
//import axios from "axios";

const { Option } = Select;
type Degree = { id: number };
type Degrees = { bachelor: Degree[]; master: Degree[]; phd: Degree[] };
type Level = "bachelor" | "master" | "phd";

const universitiesInEthiopia = [
  // Public Universities
  "Addis Ababa University (AAU)",
  "Adama Science and Technology University (ASTU)",
  "Arba Minch University (AMU)",
  "Adigrat University (AU)",
  "Ambo University (AU)",
  "Aksum University (ASU)",
  "Arsi University (ASPU)",
  "Bahir Dar University (BDU)",
  "Dilla University (DU)",
  "Debre Tabor University (DTU)",
  "Gambella University (GU)",
  "Haramaya University (HU)",
  "Hawassa University (HWU)",
  "Jigjiga University (JJU)",
  "Jimma University (JU)",
  "Jomo Kenyatta University of Agriculture and Technology (JKUAT) - Ethiopian Campus",
  "Kemise University (Kemu)",
  "Mekelle University (MU)",
  "Metu University (MTU)",
  "Nekemte University (NU)",
  "Sodo University (SU)",
  "Wollega University (WU)",
  "Wollo University (WU)",
  "Wolayta Sodo University (WSU)",

  // Private Universities
  "Admas University",
  "Akaki Science and Technology University (ASTU)",
  "Ambo University",
  "Bethel University",
  "Blue Nile University",
  "Central Ethiopia University",
  "Defense University",
  "Debre Markos University",
  "EiABC Engineering College",
  "Ethiopian Institute of Technology (EiT)",
  "Ethiopian Medical College",
  "Gondar University",
  "Hope University",
  "Jimma University of Science and Technology",
  "Kotebe Metropolitan University",
  "Mekelle University",
  "Millennium Institute of Leadership and Governance",
  "Nekemte University",
  "New Hope University College",
  "Rift Valley University College",
  "Saint Mary's University",
  "Selam University",
  "St. Paul's University College",
  "Unity University",
  "Wako University",
  "Woldia University",

  // Colleges
  "Asbeha Technical College",
  "Awassa College of Agriculture",
  "Babur Technical College",
  "Debre Birhan Polytechnic College",
  "Debub University - College of Law",
  "Dire Dawa Polytechnic College",
  "Ethiopia Institute of Public Administration & Development",
  "Gambella College of Teacher Education",
  "Gondar College of Education",
  "Haramaya University - College of Education",
  "Hawassa College of Technology",
  "Jigjiga Polytechnic College",
  "Jimma College of Agriculture",
  "Mekelle College of Technology",
  "Nekemte College of Teacher Education",
  "Shoa College of Agriculture",
  "Wondo Genet Agriculture College",
];

interface Step2Props {
  form: FormInstance<any>;
  prevStep: () => void;
  nextStep: () => void;
  handleFormData: (data: any) => void;
}

const DegreeFields: React.FC<{ degreeName: string; index: number }> = ({
  degreeName,
  index,
}) => (
  <div>
    <h2>
      {degreeName} {index + 1}
    </h2>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item label="Graduation Year" name="graduationYear">
          <Input placeholder="Enter Graduation Year" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Field of Study" name="fieldOfStudy">
          <Input placeholder="Enter Field of Study" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="University Name">
          <AutoComplete
            options={universitiesInEthiopia.map((university) => ({
              value: university,
            }))}
            filterOption={(inputValue, option) =>
              option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            placeholder="Enter University Name"
          />
        </Form.Item>
      </Col>
    </Row>
  </div>
);

const Step2: React.FC<Step2Props> = ({
  form,
  nextStep,
  prevStep,
  handleFormData,
}) => {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const [subcityOptions, setSubcityOptions] = useState<string[]>([]);
  const [woredaOptions, setWoredaOptions] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState<Level | "">("");
  const [degrees, setDegrees] = useState<Degrees>({
    bachelor: [{ id: 1 }],
    master: [{ id: 1 }],
    phd: [{ id: 1 }],
  });

  const addDegree = (level: Level) => {
    const id = degrees[level][degrees[level].length - 1].id + 1;
    setDegrees({ ...degrees, [level]: [...degrees[level], { id }] });
  };
  useEffect(() => {
    setDegrees({
      bachelor: [{ id: 1 }],
      master: [{ id: 1 }],
      phd: [{ id: 1 }],
    });
  }, [educationLevel]);

  const removeDegree = (level: Level) => {
    const newDegrees = degrees[level].slice(0, -1);
    setDegrees({ ...degrees, [level]: newDegrees });
  };

  // Reset subcity and woreda when region changes
  useEffect(() => {
    setSubcity(null);
    setWoreda(null);
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    setWoreda(null);
  }, [subcity]);

  const handleRegionChange = (value: string) => {
    const firstSubcity = Object.keys(data[value])[0];
    setRegion(value);
    setSubcity(firstSubcity);
    setSubcityOptions(Object.keys(data[value]));
    setWoredaOptions(data[value][firstSubcity]);
    form.setFieldsValue({
      subcity: firstSubcity,
      wordea: data[value][firstSubcity][0],
    });
  };

  const handleSubcityChange = (value: string) => {
    const firstWoreda = data[region!][value][0];
    setSubcity(value);
    setWoreda(firstWoreda);
    setWoredaOptions(data[region!][value]);
    form.setFieldsValue({ wordea: firstWoreda });
  };

  // const handleFormSubmit = (values: any) => {
  //   handleFormData(values); // Collect and pass the form data
  //   nextStep();
  // };

  // const handleRewardStatusChange = (value: string) => {
  //   setShowAdditionalFields(value === "yes");
  // };
const handleFormSubmit = async () => {
  try {
    const formData = await form.validateFields(); // Validate the form fields
    // Use axios to send a POST request to your JSON Server
    // await axios.post("http://localhost:3001/employees", formData);

    // Optionally, you can handle the response or perform other actions

    // Call the parent component's handleFormData function to pass the form data
    handleFormData(formData);

    // Move to the next step
    nextStep();
  } catch (error) {
    console.error("Form submission error:", error);
    // Handle errors as needed (e.g., display an error message)
  }
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
      <Form.Item label="Select Education Level">
        <Select onChange={(value) => setEducationLevel(value)}>
          <Option value="10grade">10th Grade</Option>
          <Option value="twelfth">12th Grade</Option>
          <Option value="tvet">TVET</Option>
          <Option value="diploma">Diploma</Option>
          <Option value="bachelor">Bachelor's Degree</Option>
          <Option value="master">Master's Degree</Option>
          <Option value="phd">PhD</Option>
        </Select>
      </Form.Item>

      {(["bachelor", "master", "phd"] as Level[]).map((level) =>
        degrees[level].map(
          (degree, index) =>
            educationLevel === level && (
              <DegreeFields
                degreeName={level.charAt(0).toUpperCase() + level.slice(1)}
                index={index}
                key={degree.id}
              />
            )
        )
      )}

      {(["bachelor", "master", "phd"] as Level[]).map(
        (level) =>
          educationLevel === level && (
            <>
              <Button type="dashed" onClick={() => addDegree(level)}>
                Add Another {level.charAt(0).toUpperCase() + level.slice(1)}'s
                Degree
              </Button>
              {degrees[level].length > 1 && (
                <Button
                  type="dashed"
                  danger
                  onClick={() => removeDegree(level)}
                >
                  Remove Last {level.charAt(0).toUpperCase() + level.slice(1)}'s
                  Degree
                </Button>
              )}
            </>
          )
      )}

      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Birthplace Information
          </span>
        }
        name="birthplaceInfo"
      >
        {/* Sub-form for Birthplace Information */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Region" name="region">
              <Select
                options={Object.keys(data).map((region) => ({
                  label: region,
                  value: region,
                }))}
                onChange={handleRegionChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Zone/Subcity" name="subcity">
              <Select
                options={subcityOptions.map((subcity) => ({
                  label: subcity,
                  value: subcity,
                }))}
                onChange={handleSubcityChange}
                value={subcity}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Woreda" name="wordea">
              <Select
                options={woredaOptions.map((woreda) => ({
                  label: woreda,
                  value: woreda,
                }))}
                value={woreda}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="House Number" name="houseNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Leyu Bota" name="leyuBota">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      {/* <Form.Item
        label="የዋስትና ሁኔታ"
        name="rewardStatus"
        rules={[{ required: true, message: "Please select the reward status" }]}
      >
        <Radio.Group onChange={(e) => handleRewardStatusChange(e.target.value)}>
          <Radio value="yes">አለው</Radio>
          <Radio value="no">የለውም</Radio>
        </Radio.Group>
      </Form.Item> */}

      {/* {showAdditionalFields && (
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
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your mother's phone number",
            //   },
            // ]}
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
                  {
                    required: true,
                    message: "Please enter your mother's phone number",
                  },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>

      <Space>
        <Button
          type="primary"
          onClick={prevStep}
          style={{ background: "#1890ff", borderColor: "#1890ff" }}
        >
          Previous
        </Button>
        <Button
          type="primary"
          onClick={handleFormSubmit}
          style={{ background: "#1890ff", borderColor: "#1890ff" }}
        >
          Next
        </Button>
      </Space>
    </>
  );
};

export default Step2;
