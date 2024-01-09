import React, { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';

interface Employee {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  department: string;
  evaluation: number;
  rank: number;
}

interface PerformanceData {
  employees: Employee[];
}

interface RewardProps {
  id?: string;
}

const Reward: React.FC<RewardProps> = ({ id, ...otherProps }) => {
  const { data: performanceData, isLoading } = useQuery<PerformanceData>(`performance-${id}`, async () => {
    const response = await fetch('http://localhost:3001/employees');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });

  const [sortedInfo, setSortedInfo] = useState<Record<string, any>>({});

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const columns: ColumnsType<Employee> = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      sorter: (a, b) => a.rank - b.rank,
      sortOrder: sortedInfo.columnKey === 'rank' && sortedInfo.order,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
      sortOrder: sortedInfo.columnKey === 'department' && sortedInfo.order,
    },
    {
      title: 'Evaluation',
      dataIndex: 'evaluation',
      key: 'evaluation',
      sorter: (a, b) => a.evaluation - b.evaluation,
      sortOrder: sortedInfo.columnKey === 'evaluation' && sortedInfo.order,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Table
        dataSource={performanceData?.employees || []}
        columns={columns}
        onChange={handleChange}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            // Handle row click, e.g., navigate to a detailed view
            console.log('Clicked row:', record);
          },
        })}
      />
    </div>
  );
};

export default Reward;
