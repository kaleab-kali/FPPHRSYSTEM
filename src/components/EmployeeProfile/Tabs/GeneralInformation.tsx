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
import { EmployeeData } from "../../../types/employeeData";
import { useUpdateEmployee } from "../../../services/mutations";
import GeneralInfo from "./GeneralInformation/GeneralInfo";
import CurrentAdd from "./GeneralInformation/CurrentAdd";
import BirthPlaceInfo from "./GeneralInformation/BirthPlaceInfo";
import MotherIfno from "./GeneralInformation/MotherInfo";
import MartialInfo from "./GeneralInformation/MartialInfo";
import EmergencyContactInfo from "./GeneralInformation/EmergencyContactInfo";



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
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data2[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

      const woredas = data2[region][firstSubcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({
        currentAddress: { woreda: firstWoreda },
      });
    }
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    if (region && subcity) {
      const woredas = data2[region][subcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
    }
  }, [subcity]);

    const handleRegionChange = (value: string) => {
      setRegion(value);
    };

    const handleSubcityChange = (value: string) => {
      setSubcity(value);
    };
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
  // const [region, setRegion] = useState<string | null>(null);
  // const [subcity, setSubcity] = useState<string | null>(null);
  // const [woreda, setWoreda] = useState<string | null>(null);
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

  // const { data,2 error, isLoading } = useQuery(["employee", id], async () => {
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
  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields(); // This will validate all fields and return the values
      console.log(JSON.stringify(values));
      // You can now use the values to update the employee
      if (values) {
        updateEmployeeMutuation.mutate({ ...selectedEmployee, ...values });
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };
  // const handleRegionChange = (value: string) => {
  //   if (data2 && data2.value) {
  //     const firstSubcity = Object.keys(data2.value)[0];
  //     setRegion(value);
  //     setSubcity(firstSubcity);
  //     setSubcityOptions(Object.keys(data2[value]));
  //     setWoredaOptions(data2[value][firstSubcity]);
  //     (form as any).setFieldsValue({
  //       subcity: firstSubcity,
  //       wordea: data2[value][firstSubcity][0],
  //     });
  //   }
  // };
  // const handleSubcityChange = (value: string) => {
  //   const firstWoreda = data2[region!][value][0];
  //   setSubcity(value);
  //   setWoreda(firstWoreda);
  //   setWoredaOptions(data2[region!][value]);
  //   (form as any).setFieldsValue({ wordea: firstWoreda });
  // };
  return (
    <div className="">
      {/* <ToastContainer /> */}
      <div className="gIwrapper flex flex-col space-y-10">
        <GeneralInfo selectedEmployee={selectedEmployee} />
        <CurrentAdd selectedEmployee={selectedEmployee} />
        {cardVisible === true && (
          <>
            <BirthPlaceInfo selectedEmployee={selectedEmployee} />
            <MotherIfno selectedEmployee={selectedEmployee} />
            <MartialInfo selectedEmployee={selectedEmployee} />
            <EmergencyContactInfo selectedEmployee={selectedEmployee} />

            <div className=" bg-white rounded-md p-8 space-y-5">
              <Title style={{ fontSize: 24 }}>Educational Information </Title>
              {/* {console.log("here is the edu"+selectedEmployee?.education?.bachelor[0].fieldOfStudy)} */}
              {selectedEmployee?.education?.bachelor &&
                selectedEmployee?.education?.bachelor.map((bach, index) => (
                  <Row key={index} gutter={[16, 16]}>
                    <Col span={8} className=" -space-y-2">
                      <Title style={{ fontSize: 14 }} type="secondary">
                        Field Of Study
                      </Title>
                      <Title style={{ fontSize: 16 }}>
                        {bach.fieldOfStudy}
                      </Title>
                    </Col>
                    <Col span={8} className=" -space-y-2">
                      <Title style={{ fontSize: 14 }} type="secondary">
                        Graduation Year
                      </Title>
                      <Title style={{ fontSize: 16 }}>
                        {bach.graduationYear}
                      </Title>
                    </Col>
                    <Col span={8} className=" -space-y-2">
                      <Title style={{ fontSize: 14 }} type="secondary">
                        University Name
                      </Title>
                      <Title style={{ fontSize: 16 }}>
                        {bach.universityName}
                      </Title>
                    </Col>
                  </Row>
                ))}
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
                  form={form}
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
                  <Button type="default" className="ml-3">
                    Cancel
                  </Button>
                </Form>
              </Modal>
            </div>
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
