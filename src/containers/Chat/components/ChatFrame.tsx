'use client';
import { Button, Flex, Input, Spin } from 'antd';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { useDispatch, useSelector } from '@/lib/redux';

import { selectConversation, selectCurrentChat } from '../selectors';
import {
  getChatHistoryAsync,
  getConversationAsync,
  sendMessageAsync,
} from '../thunks';
import { Message } from '@/common/models/chat';
import TextArea from 'antd/lib/input/TextArea';
import User from '@/services/user';
import Header from './Header';
import { UpOutlined } from '@ant-design/icons/lib/icons';
import MessageItem from './MessageItem';
import { MessageType } from '@/common/enums/messageType';
import Image from '@/components/Image';

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
        handleSendMessage();
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
      createdAt: msg.sentAt,
      read: msg.read,
    }));

    setMessages(convertedMessages);
  }, [conversation]);

  const handleSendMessage = async () => {
    const input = textAreaValue.trim();
    if (input !== '') {
      const resultAction = await dispatch(
        sendMessageAsync({
          content: input,
          messageSenderId: Number(User.getInstance().getUserId()),
          messageReceiverId: currentChat?.partnerId,
        }),
      );
      if (sendMessageAsync.fulfilled.match(resultAction)) {
        dispatch(
          getConversationAsync({
            senderId: Number(User.getInstance().getUserId()),
            receiverId: currentChat?.partnerId || -1,
          }),
        );
        dispatch(getChatHistoryAsync(Number(User.getInstance().getUserId())));
        setTextAreaValue('');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <div className="flex flex-col justify-between h-full grow">
      <div className="px-4 py-2 bg-gray-200">
        <Header />
      </div>
      {messages.length <= 0 && (
        <Flex vertical align="center" justify="center" gap={10}>
          <Image
            src="/images/TalkieLogo.png"
            width={100}
            height={100}
            alt="Logo"
          ></Image>
          <p className="text-lg">
            Các bạn chưa có tin nhắn nào, làm quen ngay!
          </p>
        </Flex>
      )}
      {messages.length > 0 && (
        <div className="px-4 py-2 flex-1 overflow-y-auto">
          {messages.map((message: any) => (
            <div key={message.messageId}>
              <MessageItem message={message} />
            </div>
          ))}
        </div>
      )}
      <div className="pb-4 pt-2 px-3 flex items-center bg-slate-50">
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
          className="ml-2"
          icon={<UpOutlined />}
        />
      </div>
    </div>
  );
}
