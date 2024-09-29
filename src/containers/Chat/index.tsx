'use client';

import { useSelector } from '@/lib/redux';
import History from './components/History';
import ChatFrame from './components/ChatFrame';
import { selectCurrentChat } from './selectors';
import { Flex } from 'antd';

export default function Chat() {
  const currentChat = useSelector(selectCurrentChat);

  return (
    <Flex className="grow">
      <Flex className="w-1/5">
        <History />
      </Flex>

      {currentChat && (
        <Flex className="grow">
          <ChatFrame />
        </Flex>
      )}
    </Flex>
  );
}
