import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import {
  ChatHistory,
  CurrentChat,
  MessageResponseDTO,
} from '@/common/models/chat';
import {
  getChatHistoryAsync,
  getConversationAsync,
  sendMessageAsync,
} from './thunks';

export interface ChatSliceState {
  sendMessageStatus: ApiStatus;
  getConversationStatus: ApiStatus;
  getChatHistoryStatus: ApiStatus;
  chatHistory: ChatHistory[];
  currentChat: CurrentChat | undefined;
  conversation: MessageResponseDTO[];
  chatFrameIsOpening: boolean;
}

const initialState: ChatSliceState = {
  sendMessageStatus: ApiStatus.Idle,
  getConversationStatus: ApiStatus.Idle,
  getChatHistoryStatus: ApiStatus.Idle,
  chatHistory: [],
  currentChat: undefined,
  chatFrameIsOpening: false,
  conversation: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat(state, action: PayloadAction<CurrentChat>) {
      state.currentChat = action.payload;
    },
    setChatFrameIsOpening(state, action: PayloadAction<boolean>) {
      state.chatFrameIsOpening = action.payload;
    },
  },
  extraReducers(builder) {
    sendMessage(builder);
    getConversation(builder);
    getChatHistory(builder);
  },
});

export const { setCurrentChat, setChatFrameIsOpening } = chatSlice.actions;

function getConversation(builder: ActionReducerMapBuilder<ChatSliceState>) {
  builder.addCase(
    getConversationAsync.fulfilled,
    (state: ChatSliceState, action: PayloadAction<MessageResponseDTO[]>) => {
      state.conversation = action.payload;
    },
  );
}

function sendMessage(builder: ActionReducerMapBuilder<ChatSliceState>) {
  builder
    .addCase(sendMessageAsync.pending, (state: ChatSliceState) => {
      state.sendMessageStatus = ApiStatus.Loading;
    })
    .addCase(sendMessageAsync.fulfilled, (state: ChatSliceState) => {
      state.sendMessageStatus = ApiStatus.Fulfilled;
    })
    .addCase(sendMessageAsync.rejected, (state: ChatSliceState) => {
      state.sendMessageStatus = ApiStatus.Failed;
    });
}

function getChatHistory(builder: ActionReducerMapBuilder<ChatSliceState>) {
  builder
    .addCase(getChatHistoryAsync.pending, (state: ChatSliceState) => {
      state.getChatHistoryStatus = ApiStatus.Loading;
    })
    .addCase(
      getChatHistoryAsync.fulfilled,
      (state: ChatSliceState, action: PayloadAction<ChatHistory[]>) => {
        state.chatHistory = action.payload;
        state.getChatHistoryStatus = ApiStatus.Fulfilled;
      },
    )
    .addCase(getChatHistoryAsync.rejected, (state: ChatSliceState) => {
      state.getChatHistoryStatus = ApiStatus.Failed;
    });
}
