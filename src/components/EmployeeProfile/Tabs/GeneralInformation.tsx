import React from 'react';
import { useQuery } from 'react-query';
import { Row, Col, Divider } from 'antd';
import './GeneralInformation.css';

interface Employee {
  id: number;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  gender: string;
  position: string;
  phone: {
    prefix: string;
    number: string;
  };
  email: string;
  emergencyContact: {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    houseNumber: string;
    relationship: string;
    leyuBota: string;
  };
}

function GeneralInformation() {
  const { data, error, isLoading } = useQuery<Employee[], Error>('employees', async () => {
    const response = await fetch('http://localhost:3001/employees');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredData = data?.filter((employee) => employee.id === 3)[0];

  if (!filteredData) {
    return <p>No data found for ID 3</p>;
  }

  const {
    //firstName,
   // middleName,
   // lastName,
    birthday,
    gender,
    //position,
    phone,
    email,
    emergencyContact,
  } = filteredData;

  return (
    <div className='gIwrapper'>
      <h1>General Information</h1>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p>Title: {filteredData.title}</p>
        </Col>
        {/* <Col span={8}>
          <p>Name: {`${firstName} ${middleName} ${lastName}`}</p>
        </Col> */}
        <Col span={8}>
          <p>Birthday: {birthday}</p>
        </Col>
        <Col span={8}>
          <p>Gender: {gender}</p>
        </Col>
        {/* <Col span={8}>
          <p>Position: {position}</p>
        </Col> */}
        <Col span={8}>
        <p>Phone: {`${phone.prefix} ${phone.number}`}</p>
        </Col>
        <Col span={8}>
          <p>Email: {email}</p>
        </Col>
        <Divider orientation="left">Emergency Contact Information</Divider>
        <Col span={8}>
          <p>First Name: {emergencyContact.firstName}</p>
        </Col>
        <Col span={8}>
          <p>Middle Name: {emergencyContact.middleName}</p>
        </Col>
        <Col span={8}>
          <p>Last Name: {emergencyContact.lastName}</p>
        </Col>
        <Col span={8}>
          <p>Phone Number: {emergencyContact.phoneNumber}</p>
        </Col>
        <Col span={8}>
          <p>Email: {emergencyContact.email}</p>
        </Col>
        <Col span={8}>
          <p>Relationship: {emergencyContact.relationship}</p>
        </Col>
        <Col span={8}>
          <p>House Number: {emergencyContact.houseNumber}</p>
        </Col>
        <Col span={8}>
          <p>Leyu Bota: {emergencyContact.leyuBota}</p>
        </Col>
      </Row>
    </div>
  );
}

export default GeneralInformation;
