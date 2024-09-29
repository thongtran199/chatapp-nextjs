'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@/lib/redux';
import { selectChatHistory } from '../selectors';
import { Flex } from 'antd';
import { uniqueId } from 'lodash';
import ChatHistoryItem from './ChatHistoryItem';
import { getChatHistoryAsync } from '../thunks';
import User from '@/services/user';

export default function History() {
  const chatHistory = useSelector(selectChatHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatHistoryAsync(Number(User.getInstance().getUserId())));
  }, []);

  return (
    <div className="flex grow flex-col justify-between h-full p-2 bg-slate-50">
      <div className="flex-1 overflow-y-auto mt-5">
        <p className="ml-3 text-lg">Lịch sử nhắn tin</p>
        <Flex vertical className="gap-1 mt-2 grow">
          {chatHistory.map((chatHistory) => {
            return (
              <ChatHistoryItem key={uniqueId()} chatHistory={chatHistory} />
            );
          })}
        </Flex>
      </div>
    </div>
  );
}
