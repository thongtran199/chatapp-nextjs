'use client';
import { Button, Flex, Input, Spin } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { uniqueId } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from '@/lib/redux';

import { selectConversation, selectCurrentChat } from '../selectors';
import { getConversationAsync, sendMessageAsync } from '../thunks';
import { Message } from '@/common/models/chat';
import TextArea from 'antd/lib/input/TextArea';
import User from '@/services/user';
import Header from './Header';
import { UpOutlined } from '@ant-design/icons/lib/icons';
import MessageItem from './MessageItem';
import { MessageType } from '@/common/enums/messageType';

export default function ChatFrame() {
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const currentChat = useSelector(selectCurrentChat);
  const conversation = useSelector(selectConversation);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState<Message[]>([]);

  const handleKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        const input = textAreaValue.trim();
        if (input !== '') {
          dispatch(
            sendMessageAsync({
              content: input,
              messageSenderId: Number(User.getInstance().getUserId()),
              messageReceiverId: currentChat?.userId,
            }),
          );
          dispatch(
            getConversationAsync({
              senderId: Number(User.getInstance().getUserId()),
              receiverId: currentChat?.userId || -1,
            }),
          );
          setTextAreaValue('');
        }
      }
    }
  };

  useEffect(() => {
    const userId = Number(User.getInstance().getUserId());

    const convertedMessages = conversation.map((msg) => ({
      messageId: msg.messageId,
      messageType:
        msg.messageSender.userId === userId
          ? MessageType.SEND
          : MessageType.RECEIVED,
      content: msg.content,
      createdAt: msg.createdAt,
      read: msg.read,
    }));

    setMessages(convertedMessages);
  }, [conversation]);

  const handleSendMessage = async () => {
    const input = textAreaValue.trim();
    if (input !== '') {
      dispatch(
        sendMessageAsync({
          content: input,
          messageSenderId: Number(User.getInstance().getUserId()),
          messageReceiverId: currentChat?.userId,
        }),
      );
      dispatch(
        getConversationAsync({
          senderId: Number(User.getInstance().getUserId()),
          receiverId: currentChat?.userId || -1,
        }),
      );
      setTextAreaValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="px-4 py-2">
        <Header />
      </div>
      <div className="h-3 my-2 bg-slate-50"></div>
      <div className="px-4 py-2 flex-1 overflow-y-auto">
        {messages.map((message: any) => (
          <div key={message.messageId}>
            <MessageItem message={message} />
          </div>
        ))}
      </div>
      <div className="pb-4 pt-2 flex items-center bg-slate-50">
        <TextArea
          value={textAreaValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Message to ${currentChat?.fullName || ''}`}
          autoSize={{ minRows: 2, maxRows: 5 }}
          className="flex-grow mr-4"
        />
        <Button
          onClick={handleSendMessage}
          type="primary"
          shape="circle"
          icon={<UpOutlined />}
        />
      </div>
    </div>
  );
}
