import { ReduxState } from '@/lib/redux';

export const selectConversation = (state: ReduxState) =>
  state.chat.conversation;

export const selectGetConversationStatus = (state: ReduxState) =>
  state.chat.getConversationStatus;

export const selectSendMessageStatus = (state: ReduxState) =>
  state.chat.sendMessageStatus;

export const selectGetChatHistoryStatus = (state: ReduxState) =>
  state.chat.getChatHistoryStatus;

export const selectChatHistory = (state: ReduxState) => state.chat.chatHistory;

export const selectCurrentChat = (state: ReduxState) => state.chat.currentChat;
