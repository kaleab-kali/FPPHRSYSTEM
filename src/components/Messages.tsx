// Messages.tsx
import React from 'react';
import { Divider } from 'antd';

interface Message {
  content: string;
  date: string;
}

const generateSampleMessages = (): Message[] => {
  const messages: Message[] = [];
  for (let i = 1; i <= 10; i++) {
    messages.push({
      content: `Message ${i} content.`,
      date: `2023-12-${i < 10 ? '0' + i : i}`,
    });
  }
  return messages;
};

const Messages: React.FC = () => {
  const messages = generateSampleMessages();

  return (
    <div style={{ width: '300px' }}>
      {messages.map((msg) => (
        <div key={msg.date} style={{ marginBottom: '8px' }}>
          <p style={{ margin: 0 }}>{msg.content}</p>
          <div style={{ color: '#8c8c8c', fontSize: '12px' }}>{msg.date}</div>
          <Divider style={{ margin: '8px 0' }} />
        </div>
      ))}
      {messages.length === 0 && <p>No messages available.</p>}
    </div>
  );
};

export default Messages;
