'use client';
import React from 'react';
import { Avatar, Flex, Space, Typography } from 'antd';
import { useDispatch, useSelector } from '@/lib/redux';

import { ChatHistory } from '@/common/models/chat';
import { getConversationAsync } from '../thunks';
import User from '@/services/user';
import { UserOutlined } from '@ant-design/icons';
import { setCurrentChat } from '../slice';
import { DatetimeFormat, formatDate } from '@/utils/date';
import { selectConversation } from '../selectors';

const Text = Typography.Text;

export default function ChatHistoryItem({
  chatHistory,
}: {
  chatHistory: ChatHistory;
}) {
  const dispatch = useDispatch();
  const conversation = useSelector(selectConversation);

  const handleClick = async () => {
    const resultAction = await dispatch(
      getConversationAsync({
        senderId: Number(User.getInstance().getUserId()),
        receiverId: chatHistory.partnerId,
      }),
    );
    if (getConversationAsync.fulfilled.match(resultAction)) {
      dispatch(
        setCurrentChat({
          chatHistory: chatHistory,
          conversation: conversation,
        }),
      );
    }
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      className="w-full p-2 cursor-pointer"
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
        <Space direction="vertical" className="ml-3">
          <Text strong>{chatHistory.fullName}</Text>
          {chatHistory.latestMessage && (
            <>
              <Text type="secondary" className="text-wrap ...">
                {chatHistory.latestMessage.content}
              </Text>
              <Text type="secondary" className="text-wrap ...">
                {formatDate(chatHistory.latestMessage.sentAt, DatetimeFormat)}
              </Text>
            </>
          )}
        </Space>
      </Space>
    </Flex>
  );
}
