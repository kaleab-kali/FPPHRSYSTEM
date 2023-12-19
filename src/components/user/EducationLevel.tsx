import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  AutoComplete,
  Modal,
  Table,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

const { Option } = Select;
type Degree = { id: number };
type Degrees = { bachelor: Degree[]; master: Degree[]; phd: Degree[] };
type Level = "bachelor" | "master" | "phd";

interface EducationItem {
  id: number;
  educationLevel: string;
  graduationYear: string;
  fieldOfStudy: string;
  instituteName: string;
  action: number;
}
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

const EducationLevel: React.FC<any> = () => {
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

  const columns = [
    {
      title: "Education Level",
      dataIndex: "educationLevel",
      key: "educationLevel",
    },
    {
      title: "Graduation Year",
      dataIndex: "graduationYear",
      key: "graduationYear",
    },
    { title: "Field of Study", dataIndex: "fieldOfStudy", key: "fieldOfStudy" },
    {
      title: "Institute Name",
      dataIndex: "instituteName",
      key: "instituteName",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: Degree) => (
        <div className="flex flex-row space-x-4">
          <Button
            type="link"
            className="bg-red-700 text-white"
            // onClick={() => removeDegree(educationLevel, record.id)}
          >
            Remove
          </Button>
          <Button
            type="link"
            className="bg-blue-700 text-white"
            // onClick={() => removeDegree(educationLevel, record.id)}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];
  const dataSource: EducationItem[] = [
    {
      id: 1,
      educationLevel: "Bachelor",
      graduationYear: "2022",
      fieldOfStudy: "Computer Science",
      instituteName: "ASTU",
      action: 1,
    },
    // Add more sample rows as needed
  ];
  //  const dataSource = degrees[educationLevel].map((degree) => ({
  //    ...degree,
  //    key: degree.id,
  //    action: "Remove",
  //  }));

  //   const onFinish = (values: any) => {
  //     handleFormData(values); // Collect and pass the form data
  //     nextStep();
  //   };

  return (
    <div className="felx w-full">
      <Button onClick={() => showModal()}>
        <PlusOutlined />
        Add
      </Button>
      <Modal
        title="Add Education Level"
        visible={isModalVisible}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
      >
        <Row gutter={24}>
          <Form.Item label="Select Education Level" className="w-full">
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
        </Row>

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
              <div className="flex flex-row justify-between">
                <Button
                  type="dashed"
                  className=" border border-blue-500 bg-blue-500 hover:bg-white"
                  onClick={() => addDegree(level)}
                >
                  Add Another {level.charAt(0).toUpperCase() + level.slice(1)}'s
                  Degree
                </Button>
                {degrees[level].length > 1 && (
                  <Button
                    type="dashed"
                    danger
                    onClick={() => removeDegree(level)}
                  >
                    Remove Last {level.charAt(0).toUpperCase() + level.slice(1)}
                    's Degree
                  </Button>
                )}
              </div>
            )
        )}
      </Modal>
      {/* {educationLevel && ( */}
      {/* <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
          style={{ marginTop: 16 }}
        /> */}
      {/* )} */}
      <br />
      <br />
      <br />
      <div className="search-table-outter wrapper mb-11 shadow-md rounded-md  border-l-4  border-blue-500     mt-9">
        <table
          id="example"
          className="display nowrap p-5"
          style={{ width: "100%" }}
        >
          <tbody className="justify-around py-10">
            <tr
              className="text-slate-600 bg-slate-200 text-md font-bold pt-4"
              style={{ textAlign: "start" }}
            >
              <td>Education Level</td>
              <td>Graduation Year</td>
              <td>FieldOfStudy</td>
              <td>InstituteName</td>
              <td>Action</td>
            </tr>
            {dataSource.map((data: any) => (
              <tr
                key={data.key}
                className="py-10 mb-10 text-slate-500"
                style={{ textAlign: "start", margin: 32 }}
              >
                <td>{data.educationLevel}</td>
                <td>{data.graduationYear}</td>
                <td>{data.fieldOfStudy}</td>
                <td>{data.instituteName}</td>
                <td>{data.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EducationLevel;
