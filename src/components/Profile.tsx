

// Profile.tsx

import React from 'react';
import { Card, Avatar } from 'antd';

interface ProfileProps {
  name: string;
  age: number;
  sex: string;
  position: string;
  department: string;
  pictureUrl: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  age,
  sex,
  position,
  department,
  pictureUrl,
}) => {
  return (
    <Card>
      <Card.Meta
        avatar={<Avatar src={pictureUrl} />}
        title={name}
        description={`Age: ${age} | Sex: ${sex}`}
      />
      <div style={{ marginTop: '16px' }}>
        <p>Position: {position}</p>
        <p>Department: {department}</p>
      </div>
    </Card>
  );
};

export default Profile;
