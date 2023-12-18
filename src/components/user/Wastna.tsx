import { Form, Input, Radio, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import React, { useState } from 'react'

export const Wastna = () => {
  const {Option}=Select;
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  
  const handleRewardStatusChange = (value: string) => {
    setShowAdditionalFields(value === "yes");
  };

  return (
    <div>
      
      <Form.Item
        label="የዋስትና ሁኔታ"
        name="rewardStatus"
        rules={[{ required: true, message: "Please select the reward status" }]}
      >
        <Radio.Group onChange={(e) => handleRewardStatusChange(e.target.value)}>
          <Radio value="yes">አለው</Radio>
          <Radio value="no">የለውም</Radio>
        </Radio.Group>
      </Form.Item>

      {showAdditionalFields && (
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
      )}
    </div>
  )
}
