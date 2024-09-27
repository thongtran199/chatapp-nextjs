import { MessageRequest } from '@/common/models/chat';
import { AddFriendRequest } from '@/common/models/friend';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

export const TypePrefix = 'chat';

export const getConversationAsync = createAppAsyncThunk(
  `${TypePrefix}/getConversation`,
  async ({ senderId, receiverId }: { senderId: number; receiverId: number }) =>
    await callApi(`message/conversation/${senderId}/${receiverId}`, {
      method: 'GET',
    }),
);

export const sendMessageAsync = createAppAsyncThunk(
  `${TypePrefix}/sendMessage`,
  async (messageRequest: MessageRequest) => {
    if (!messageRequest.messageReceiverId) return;
    const sendMessageResponse = await callApi(`message/send`, {
      method: 'POST',
      body: JSON.stringify(messageRequest),
    });
    return sendMessageResponse;
  },
);

export const getChatHistoryAsync = createAppAsyncThunk(
  `${TypePrefix}/getChatHistory`,
  async (userId: number) => {
    const getChatHistoryResponse = await callApi(
      `message/chat-history/${userId}`,
      {
        method: 'GET',
      },
    );
    return getChatHistoryResponse;
  },
);
