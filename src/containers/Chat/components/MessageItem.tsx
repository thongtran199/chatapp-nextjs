'use client';

import { useDispatch, useSelector } from '@/lib/redux';
import { Message } from '@/common/models/chat';
import { MessageType } from '@/common/enums/messageType';
import { selectCurrentChat } from '../selectors';
import { Avatar, Flex } from 'antd';
export default function MessageItem({ message }: { message: Message }) {
  const currentChat = useSelector(selectCurrentChat);
  return (
    <Flex
      justify={message.messageType === MessageType.RECEIVED ? 'start' : 'end'}
      className="py-1"
      align="start"
      gap={4}
    >
      {message.messageType === MessageType.RECEIVED && (
        <Avatar
          style={{ minWidth: 'fit-content' }}
          src={currentChat?.avatarUrl || ''}
        ></Avatar>
      )}
      <Flex vertical gap={2} className="w-[80%]">
        <div
          className={`flex ${message.messageType === MessageType.RECEIVED ? 'justify-start' : 'justify-end'}`}
        >
          <p className="break-words text-base bg-slate-200 rounded-xl py-2 px-2 w-fit max-w-full">
            {message.content}
          </p>
        </div>
      </Flex>
    </Flex>
  );
}
