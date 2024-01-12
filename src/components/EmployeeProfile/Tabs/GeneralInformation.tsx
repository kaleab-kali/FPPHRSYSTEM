import React, { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Modal,
  FloatButton,
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  AutoComplete,
} from "antd";
// import { Row, Col, Divider } from "antd";
import "./GeneralInformation.css";
import { EditOutlined } from "@ant-design/icons";
import { data2 } from "../../../data2";
import getAge from "../../../util/ageCal";
import form, { FormInstance } from "antd/lib/form";
export interface EmployeeData {
  _id: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  name: string;
  email: string;
  requiredField: string;
  houseNumber: string;
  birthday: string;
  gender: string;
  position: string;
  department: string;
  ethnicity: string;
  region: string;
  subcity: string;
  wordea: string;
  camp?: string;
  salary: number;
  educationalLevel: string;
  relationship: string;
  leyuBota?: string;
  phone: {
    prefix: string;
    number: number;
  };
  motherInformation: {
    motherPhoneNumber: {
      prefix: string;
      number: number;
    };
    motherFirstName: string;
    motherMiddleName: string;
    motherLastName: string;
  };
  maritalStatus: {
    martialType: string;
    spouseInfo: {
      firstName: string;
      middleName: string;
      lastName: string;
      dob: Date;
      phoneNumber: {
        prefix: string;
        number: number;
      };
      address: {
        currentAddress: {
          region: string;
          subcity: string;
        };
      };
    };
    divorcedInfo: {
      divorceDate: Date;
    };
  };
}

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
interface GeneralInformationProps {
  selectedEmployee?: EmployeeData; // Make selectedEmployee optional
}

function GeneralInformation({ selectedEmployee }: GeneralInformationProps) {
  const { Title, Text } = Typography;
  const { Option } = Select;
  // State to track the visibility of the emergency contact information
  const [showEmergencyContact, setShowEmergencyContact] = React.useState(false);

  // State to track the visibility of each edit modal
  const [generalEditModalVisible, setEditGeneralModalVisible] =
    React.useState(false);
  const [currentAddEditModalVisible, setEditCurrentAddModalVisible] =
    React.useState(false);
  const [emergencyEditModalVisible, setEditEmergencyModalVisible] =
    React.useState(false);
  const [birthDateEditModalVisible, setEditBirthDateModalVisible] =
    React.useState(false);
  const [motherInfoEditModalVisible, setEditMotherInfoModalVisible] =
    React.useState(false);
  const [martialInfoEditModalVisible, setEditMartialInfoModalVisible] =
    React.useState(false);
  const [educationInfoEditModalVisible, setEditEducationInfoModalVisible] =
    React.useState(false);

  const [cardVisible, setCardVisible] = React.useState(false);
  // For region
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const [subcityOptions, setSubcityOptions] = useState<string[]>([]);
  const [woredaOptions, setWoredaOptions] = useState<string[]>([]);

  const [maritalStatus, setMaritalStatus] = useState<string>("single");

  const handleMaritalStatusChange = (value: string) => {
    setMaritalStatus(value);
  };
  const DegreeFields: React.FC<{ degreeName: string; index: number }> = ({
    degreeName,
    index,
  }) => (
    <div>
      <h2>
        {degreeName} {index + 1}
      </h2>
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item label="Graduation Year" name="graduationYear">
            <Input placeholder="Enter Graduation Year" />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Field of Study" name="fieldOfStudy">
            <Input placeholder="Enter Field of Study" />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="University Name">
            <AutoComplete
              options={universitiesInEthiopia.map((university) => ({
                value: university,
              }))}
              filterOption={(inputValue, option) =>
                option?.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              placeholder="Enter University Name"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
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

  // const { data, error, isLoading } = useQuery(["employee", id], async () => {
  //   try {
  //     // Dispatch the action and wait for the promise
  //     const response = await dispatch(fetchEmployee(id));
  //     return response.payload; // Adjust this based on the structure of your response
  //   } catch (error) {
  //     console.error("Error message:", error);
  //     throw error;
  //   }
  // });


  const handleToggleEmergencyContact = () => {
    setShowEmergencyContact(!showEmergencyContact);
  };

  // Handler to toggle the visibility of the edit modal for each card
  const handleToggleGeneralEditModal = () => {
    setEditGeneralModalVisible(!generalEditModalVisible);
  };
  const handleToggleCurrentAddEditModal = () => {
    setEditCurrentAddModalVisible(!currentAddEditModalVisible);
  };
  const handleToggleEmergencyEditModal = () => {
    setEditEmergencyModalVisible(!emergencyEditModalVisible);
  };
  const handleToggleBirthDateEditModal = () => {
    setEditBirthDateModalVisible(!birthDateEditModalVisible);
  };
  const handleToggleMotherInfoEditModal = () => {
    setEditMotherInfoModalVisible(!motherInfoEditModalVisible);
  };
  const handleToggleMartialInfoEditModal = () => {
    setEditMartialInfoModalVisible(!martialInfoEditModalVisible);
  };
  const handleToggleEducationInfoEditModal = () => {
    setEditEducationInfoModalVisible(!educationInfoEditModalVisible);
  };
  const handleCardVisible = () => {
    setCardVisible(!cardVisible);
  };


  const handleFormSubmit = (values: any) => {
    // Compare form values with initial values
    const isFormChanged = Object.keys(values).some(
      (key) => values[key] !== data2[key]
    );

    // if (isFormChanged) {
    //   toast.success("Data updated successfully");
    // } else {
    //   toast.warning("No changes made");
    // }
  };
  const handleRegionChange = (value: string) => {
    const firstSubcity = Object.keys(data2.value)[0];
    setRegion(value);
    setSubcity(firstSubcity);
    setSubcityOptions(Object.keys(data2[value]));
    setWoredaOptions(data2[value][firstSubcity]);
    (form as any).setFieldsValue({
      subcity: firstSubcity,
      wordea: data2[value][firstSubcity][0],
    });
  };
  const handleSubcityChange = (value: string) => {
    const firstWoreda = data2[region!][value][0];
    setSubcity(value);
    setWoreda(firstWoreda);
    setWoredaOptions(data2[region!][value]);
    (form as any).setFieldsValue({ wordea: firstWoreda });
  };
  return (
    <div className="">
      {/* <ToastContainer /> */}
      <div className="gIwrapper flex flex-col space-y-10">
        <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
          <Title style={{ fontSize: 24 }}>General Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Title
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.title}</Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                First Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.firstName}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Middle Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.middleName}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Last Name
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.lastName}
              </Title>
            </Col>
            {/* <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Age
              </Title>
              <Title style={{ fontSize: 16 }}>
                {getAge(selectedEmployee?.birthday)}
              </Title>
            </Col> */}
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Gender
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.gender}</Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Phone
              </Title>
              <Title style={{ fontSize: 16 }}>
                {" "}
                {selectedEmployee?.phone.number}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Email
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.email}</Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Position
              </Title>
              <Title style={{ fontSize: 16 }}>
                {" "}
                {selectedEmployee?.position}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Department
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.department}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Ethnicity
              </Title>
              <Title style={{ fontSize: 16 }}>
                {" "}
                {selectedEmployee?.ethnicity}
              </Title>
            </Col>
            <Col span={6} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Salary
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.salary}</Title>
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleToggleGeneralEditModal}
            className=" float-right bg-blue-500"
          >
            Edit
          </Button>
          <Modal
            title="Edit General Information"
            visible={generalEditModalVisible}
            onCancel={handleToggleGeneralEditModal}
            footer={null}
          >
            <Form
              name="editGeneralInfoForm"
              initialValues={selectedEmployee}
              // onFinish={handleFormSubmit} // Uncomment and provide your form submit handler
            >
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please select a title" },
                    ]}
                  >
                    <Select>
                      <Option value="ato">Ato</Option>
                      <Option value="doctor">Doctor</Option>
                      {/* Add other 14 levels as needed */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col span={16}>
                  <Form.Item
                    label="Birthday"
                    name="birthday"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birthday",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col> */}
              </Row>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}
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
                    rules={[
                      { required: true, message: "Please enter your position" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your department",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Form.Item
                label="Photo"
                name="photo"
                rules={[
                  { required: true, message: "Please upload your photo" },
                ]}
              >
                <Input type="file" />
              </Form.Item> */}

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
                  <Option value="Tigray">Tigray</Option>
                  <Option value="Somale">Somale</Option>
                  <Option value="Gurage">Gurage</Option>
                  <Option value="Wolyaita">Wolyaita</Option>
                  <Option value="Gambela">Gambela</Option>
                  <Option value="Gumuz">Gumuz</Option>
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter your phone number",
                    //   },
                    // ]}
                  >
                    <Input.Group compact>
                      <Form.Item name={["phone", "number"]} noStyle>
                        <Input style={{ width: "80%" }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                onClick={handleFormSubmit}
                style={{ background: "#1890ff", borderColor: "#1890ff" }}
              >
                Save
              </Button>
              <Button
                type="default"
                // onClick={handleFormSubmit}
                className="ml-3"
              >
                Cancel
              </Button>
            </Form>
          </Modal>
        </div>
        <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
          <Title style={{ fontSize: 24 }}>Current Address</Title>
          <Row gutter={[16, 16]}>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Region
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.region}</Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Zone/Subcity
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.subcity}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Woreda
              </Title>
              <Title style={{ fontSize: 16 }}>{selectedEmployee?.wordea}</Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                House Number
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.houseNumber}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Leyu Bota
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.leyuBota}
              </Title>
            </Col>
          </Row>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleToggleCurrentAddEditModal}
            className=" float-right bg-blue-500"
          >
            Edit
          </Button>
          <Modal
            title="Edit Current Address Information"
            visible={currentAddEditModalVisible}
            onCancel={handleToggleCurrentAddEditModal}
            footer={null}
          >
            <Form
              name="editCurrentAddressForm"
              initialValues={selectedEmployee}
            >
              <Row gutter={16}>
                <Col span={10}>
                  <Form.Item label="Region" name="region">
                    <Select
                      options={Object.keys(data2).map((region) => ({
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
                <Col span={12}>
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
                <Col span={10}>
                  <Form.Item label="House Number" name="houseNumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={10}>
                  <Form.Item label="Leyu Bota" name="leyuBota">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Camp" name="camp">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                onClick={handleFormSubmit}
                style={{ background: "#1890ff", borderColor: "#1890ff" }}
              >
                Save
              </Button>
              <Button
                type="default"
                // onClick={handleFormSubmit}
                className="ml-3"
              >
                Cancel
              </Button>
            </Form>
          </Modal>
        </div>
        {cardVisible === true && (
          <>
            <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
              <Title style={{ fontSize: 24 }}>Birth Place Information</Title>
              <Row gutter={[16, 16]}>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Region
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.region}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Zone/Subcity
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.subcity}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Woreda
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.wordea}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    House Number
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.houseNumber}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Leyu Bota
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.leyuBota}
                  </Title>
                </Col>
              </Row>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleToggleBirthDateEditModal}
                className=" float-right bg-blue-500"
              >
                Edit
              </Button>
              <Modal
                title="Edit Birth Place Information"
                visible={birthDateEditModalVisible}
                onCancel={handleToggleBirthDateEditModal}
                footer={null}
              >
                <Form
                  name="editBirthPlaceInfo"
                  initialValues={selectedEmployee}
                >
                  <Row gutter={16}>
                    <Col span={10}>
                      <Form.Item label="Region" name="region">
                        <Select
                          options={Object.keys(data2).map((region) => ({
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
                    <Col span={12}>
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
                    <Col span={10}>
                      <Form.Item label="House Number" name="houseNumber">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={10}>
                      <Form.Item label="Leyu Bota" name="leyuBota">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="Camp" name="camp">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    style={{ background: "#1890ff", borderColor: "#1890ff" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    // onClick={handleFormSubmit}
                    className="ml-3"
                  >
                    Cancel
                  </Button>
                </Form>
              </Modal>
            </div>
            <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
              <Title style={{ fontSize: 24 }}>Mother's Information</Title>
              <Row gutter={[16, 16]}>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    First Name
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.motherInformation.motherFirstName}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Middle Name
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.motherInformation.motherMiddleName}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Last Name
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.motherInformation.motherLastName}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Phone Number
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {
                      selectedEmployee?.motherInformation.motherPhoneNumber
                        .number
                    }
                  </Title>
                </Col>
              </Row>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleToggleMotherInfoEditModal}
                className=" float-right bg-blue-500"
              >
                Edit
              </Button>
              <Modal
                title="Edit Mother's Information"
                visible={motherInfoEditModalVisible}
                onCancel={handleToggleMotherInfoEditModal}
                footer={null}
              >
                <Form name="editMotherInfo" initialValues={selectedEmployee}>
                  <Row gutter={16}>
                    <Col span={16}>
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
                    <Col span={16}>
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
                    <Col span={16}>
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
                    <Col span={16}>
                      {/* Input Group for Phone Number */}
                      <Form.Item
                        label="Mother's Phone Number"
                        name="motherPhoneNumber"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    style={{ background: "#1890ff", borderColor: "#1890ff" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    // onClick={handleFormSubmit}
                    className="ml-3"
                  >
                    Cancel
                  </Button>
                </Form>
              </Modal>
            </div>
            <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
              <Title style={{ fontSize: 24 }}>Martial Information</Title>
              <Row gutter={[16, 16]}>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Martial Status
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.maritalStatus.martialType}
                  </Title>
                </Col>
              </Row>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleToggleMartialInfoEditModal}
                className=" float-right bg-blue-500"
              >
                Edit
              </Button>
              <Modal
                title="Edit Martial Information"
                visible={martialInfoEditModalVisible}
                onCancel={handleToggleMartialInfoEditModal}
                footer={null}
              >
                <Form name="editMartialInfo" initialValues={selectedEmployee}>
                  <Form.Item
                    label="Marital Status"
                    name="maritalStatus"
                    initialValue="single"
                  >
                    <Select onChange={handleMaritalStatusChange}>
                      <Option value="married">Married</Option>
                      <Option value="single">Single</Option>
                      <Option value="divorced">Divorced</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.maritalStatus !== currentValues.maritalStatus
                    }
                  >
                    {({ getFieldValue }) => {
                      const currentStatus = getFieldValue("maritalStatus");

                      return (
                        <>
                          {currentStatus === "married" && (
                            <Form.Item
                              label="Spouse Information"
                              name="spouseInfo"
                            >
                              <Row gutter={16}>
                                <Col span={16}>
                                  <Form.Item
                                    label="First Name"
                                    name={["spouseInfo", "firstName"]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item
                                    label="Middle Name"
                                    name={["spouseInfo", "middleName"]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item
                                    label="Last Name"
                                    name={["spouseInfo", "lastName"]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item
                                    label="Date of Birth"
                                    name={["spouseInfo", "dob"]}
                                  >
                                    <DatePicker placement="bottomLeft" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={16}>
                                <Col span={16}>
                                  <Form.Item
                                    label="Phone Number"
                                    name={["spouseInfo", "phoneNumber"]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item
                                label="Address"
                                name={[
                                  "spouseInfo",
                                  "address",
                                  "currentAddress",
                                ]}
                              >
                                {/* Sub-form for Spouse Address */}
                                <Row gutter={16}>
                                  <Col span={16}>
                                    <Form.Item
                                      label="Region"
                                      name={["spouseInfo", "address", "region"]}
                                    >
                                      <Select>
                                        {/* Options for Region */}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col span={16}>
                                    <Form.Item
                                      label="Subcity"
                                      name={[
                                        "spouseInfo",
                                        "address",
                                        "subcity",
                                      ]}
                                    >
                                      <Select>
                                        {/* Options for Subcity */}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Form.Item>
                          )}

                          {currentStatus === "divorced" && (
                            <Form.Item
                              label="Divorced Information"
                              name="divorcedInfo"
                            >
                              <Row gutter={16}>
                                <Col span={16}>
                                  <Form.Item
                                    label="Divorce Date"
                                    name={["divorcedInfo", "divorceDate"]}
                                  >
                                    <DatePicker style={{ width: "100%" }} />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form.Item>
                          )}
                        </>
                      );
                    }}
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    style={{ background: "#1890ff", borderColor: "#1890ff" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    // onClick={handleFormSubmit}
                    className="ml-3"
                  >
                    Cancel
                  </Button>
                </Form>
              </Modal>
            </div>
            {/* <div className=" bg-white rounded-md p-8 space-y-5">
              <Title style={{ fontSize: 24 }}>Educational Information </Title>
              <Row gutter={[16, 16]}>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Region
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.region}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Zone/Subcity
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.subcity}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Woreda
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.wordea}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    House Number
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.houseNumber}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Leyu Bota
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {selectedEmployee?.salary}
                  </Title>
                </Col>
              </Row>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleToggleEducationInfoEditModal}
                className=" float-right bg-blue-500"
              >
                Edit
              </Button>
              <Modal
                title="Edit Educational Information"
                visible={educationInfoEditModalVisible}
                onCancel={handleToggleEducationInfoEditModal}
                footer={null}
              >
                <Form
                  name="editEducationalInfo"
                  initialValues={selectedEmployee}
                >
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
                            degreeName={
                              level.charAt(0).toUpperCase() + level.slice(1)
                            }
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
                          <Button
                            type="dashed"
                            onClick={() => addDegree(level)}
                          >
                            Add Another{" "}
                            {level.charAt(0).toUpperCase() + level.slice(1)}'s
                            Degree
                          </Button>
                          {degrees[level].length > 1 && (
                            <Button
                              type="dashed"
                              danger
                              onClick={() => removeDegree(level)}
                            >
                              Remove Last{" "}
                              {level.charAt(0).toUpperCase() + level.slice(1)}'s
                              Degree
                            </Button>
                          )}
                        </>
                      )
                  )}
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    style={{ background: "#1890ff", borderColor: "#1890ff" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    className="ml-3"
                  >
                    Cancel
                  </Button>
                </Form>
              </Modal>
            </div> */}
            {/* <div className=" bg-white rounded-md p-10">
              <Title style={{ fontSize: 24 }}>
                Emergency Contact Information
              </Title>
              <Row gutter={[16, 16]}>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    First Name
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {emergencyContact.firstName}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Middle Name
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {emergencyContact.middleName}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Last Name
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {emergencyContact.lastName}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Phone Number
                  </Title>
                  <Title style={{ fontSize: 16 }}>
                    {emergencyContact.phoneNumber}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Email
                  </Title>
                  <Title style={{ fontSize: 19 }}>
                    {emergencyContact.email}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Relationship
                  </Title>
                  <Title style={{ fontSize: 19 }}>
                    {emergencyContact.relationship}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    House Number
                  </Title>
                  <Title style={{ fontSize: 19 }}>
                    {emergencyContact.houseNumber}
                  </Title>
                </Col>
                <Col span={8} className=" -space-y-2">
                  <Title style={{ fontSize: 14 }} type="secondary">
                    Leyu Bota
                  </Title>
                  <Title style={{ fontSize: 19 }}>
                    {emergencyContact.leyuBota}
                  </Title>
                </Col>
              </Row>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleToggleEmergencyEditModal}
                className="float-right bg-blue-500"
              >
                Edit
              </Button>
              <Modal
                title="Edit Emergency Information"
                visible={emergencyEditModalVisible}
                onCancel={handleToggleEmergencyEditModal}
                footer={null}
              >
                <Form name="editEmergencyInfo" initialValues={initialValues}>
                  <Row gutter={16}>
                    <Col span={16}>
                      <Form.Item
                        label="First Name"
                        name={["emergencyContact", "firstName"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the first name",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        label="Middle Name"
                        name={["emergencyContact", "middleName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        label="Last Name"
                        name={["emergencyContact", "lastName"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the last name",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Relationship"
                        name={["emergencyContact", "relationship"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select the relationship",
                          },
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
                    <Col span={12}>
                      <Form.Item
                        label="Phone Number"
                        name={["emergencyContact", "phoneNumber"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the phone number",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        label="Email"
                        name={["emergencyContact", "email"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Text>Address</Text>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Region" name="region">
                        <Select
                          options={Object.keys(data2).map((region) => ({
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
                    <Col span={12}>
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
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Leyu Bota"
                        name={["emergencyContact", "leyuBota"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        label="House Number"
                        name={["emergencyContact", "houseNumber"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    style={{ background: "#1890ff", borderColor: "#1890ff" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    className="ml-3"
                  >
                    Cancel
                  </Button>
                </Form>
              </Modal>
            </div> */}
          </>
        )}
      </div>
      <div className=" float-right">
        {cardVisible === false ? (
          <FloatButton
            shape="circle"
            type="primary"
            description="See More"
            onClick={handleCardVisible}
          />
        ) : (
          <FloatButton
            shape="circle"
            type="primary"
            description="See Less"
            onClick={handleCardVisible}
          />
        )}
      </div>
    </div>
  );
}

export default GeneralInformation;
