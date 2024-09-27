'use client';

import { useSelector } from '@/lib/redux';
import History from './components/History';
import ChatFrame from './components/ChatFrame';
import { selectCurrentChat } from './selectors';

export default function Chat() {
  const currentChat = useSelector(selectCurrentChat);

  return (
    <div className="bg-slate-100 h-[100vh] text-black flex flex-col">
      <div className="flex flex-1 h-[100vh]">
        <div className="w-1/4">
          <History />
        </div>
        <div className="flex flex-col w-3/4">
          {currentChat && <ChatFrame />}
        </div>
      </div>
    </div>
  );
}
