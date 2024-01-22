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
import { EditOutlined } from "@ant-design/icons";
import { data } from "../../../../data";
import { EmployeeData } from "../../../../types/employeeData";
import { useUpdateEmployee } from "../../../../services/mutations";


interface BirthPlaceInfoProps {
  selectedEmployee?: EmployeeData; // Make selectedEmployee optional
}

function BirthPlaceInfo({ selectedEmployee }: BirthPlaceInfoProps) {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

      const woredas = data[region][firstSubcity];
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
      const woredas = data[region][subcity];
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

  // State to track the visibility of each edit modal

  const [birthDateEditModalVisible, setEditBirthDateModalVisible] =
    React.useState(false);


  const handleToggleBirthDateEditModal = () => {
    setEditBirthDateModalVisible(!birthDateEditModalVisible);
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
  return (
    <div className="">
      <div className="gIwrapper flex flex-col space-y-10">
        <div className=" bg-white rounded-md px-8 py-2 space-y-5  shadow-md">
          <Title style={{ fontSize: 24 }}>Birth Place Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Region
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.birthplaceInfo.region}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Zone/Subcity
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.birthplaceInfo.subcity}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Woreda
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.birthplaceInfo.woreda}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                House Number
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.birthplaceInfo.houseNumber}
              </Title>
            </Col>
            <Col span={8} className=" -space-y-2">
              <Title style={{ fontSize: 14 }} type="secondary">
                Leyu Bota
              </Title>
              <Title style={{ fontSize: 16 }}>
                {selectedEmployee?.birthplaceInfo.leyuBota}
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
            title="editBirthPlaceInformation"
            visible={birthDateEditModalVisible}
            onCancel={handleToggleBirthDateEditModal}
            footer={null}
          >
            <Form
              name="editBirthPlaceInfo"
              initialValues={selectedEmployee}
              form={form}
              onFinish={handleFormSubmit}
            >
              <Row gutter={16}>
                <Col span={10}>
                  <Form.Item label="Region" name={["birthplaceInfo", "region"]}>
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
                  <Form.Item
                    label="Zone/Subcity"
                    name={["birthplaceInfo", "subcity"]}
                  >
                    <Select
                      options={
                        region
                          ? Object.keys(data[region]).map((subcity) => ({
                              label: subcity,
                              value: subcity,
                            }))
                          : []
                      }
                      onChange={handleSubcityChange}
                      value={subcity}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Woreda" name={["birthplaceInfo", "woreda"]}>
                    <Select
                      options={
                        region && subcity
                          ? data[region][subcity].map((woreda) => ({
                              label: woreda,
                              value: woreda,
                            }))
                          : []
                      }
                      value={woreda}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="House Number"
                    name={["birthplaceInfo", "houseNumber"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={10}>
                  <Form.Item
                    label="Leyu Bota"
                    name={["birthplaceInfo", "leyuBota"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Camp" name={["birthplaceInfo", "camp"]}>
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
              <Button type="default" className="ml-3">
                Cancel
              </Button>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BirthPlaceInfo;
