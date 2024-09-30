'use client';
import { useSelector } from '@/lib/redux';
import { Avatar, Flex } from 'antd';
import React from 'react';
import { selectCurrentChat } from '../selectors';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';

export default function Header() {
  const currentChat = useSelector(selectCurrentChat);

  return (
    <Flex justify="space-between">
      <Flex justify="flex-start" align="center">
        <Avatar
          src={currentChat?.chatHistory.avatarUrl || undefined}
          icon={!currentChat?.chatHistory.avatarUrl ? <UserOutlined /> : null}
          size={48}
        />
        <p className="ml-10 text-[1rem] font-bold">
          {currentChat?.chatHistory.username}
        </p>
      </Flex>
    </Flex>
  );
}
