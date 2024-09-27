'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Flex, Space, Typography } from 'antd';
import { useDispatch, useSelector } from '@/lib/redux';

import { ChatHistory } from '@/common/models/chat';
import { getConversationAsync } from '../thunks';
import User from '@/services/user';
import { UserOutlined } from '@ant-design/icons';
import { setCurrentChat } from '../slice';

const Text = Typography.Text;

export default function ChatHistoryItem({
  chatHistory,
}: {
  chatHistory: ChatHistory;
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      getConversationAsync({
        senderId: Number(User.getInstance().getUserId()),
        receiverId: chatHistory.userId,
      }),
    );
    dispatch(setCurrentChat(chatHistory));
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      className="w-full p-2"
      style={{
        borderBottom: '1px solid #f0f0f0',
      }}
      onClick={handleClick}
    >
      <Space direction="horizontal" align="center" size={16}>
        <Avatar
          src={chatHistory.avatarUrl || undefined}
          icon={!chatHistory.avatarUrl ? <UserOutlined /> : null}
          size={48}
        />
        <Space direction="vertical">
          <Text strong>{chatHistory.fullName}</Text>
          <Text type="secondary">@{chatHistory.username}</Text>
        </Space>
      </Space>
    </Flex>
  );
}
