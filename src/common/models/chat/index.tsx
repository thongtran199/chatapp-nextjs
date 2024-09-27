import { MessageType } from '@/common/enums/messageType';

export interface MessageRequest {
  messageSenderId: number;
  messageReceiverId?: number;
  content: string;
}

export interface ChatHistory {
  userId: number;
  fullName: string;
  username: string;
  avatarUrl: string;
  latestMessage: LatestMessage | null;
}

export interface LatestMessage {
  content: string;
  createdAt: string;
}

export interface MessageSenderReceiverResponseDTO {
  userId: number;
}
export interface MessageResponseDTO {
  messageId: number;
  messageSender: MessageSenderReceiverResponseDTO;
  messageReceiver: MessageSenderReceiverResponseDTO;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Message {
  messageId: number;
  messageType: MessageType;
  content: string;
  createdAt: string;
  read?: boolean;
}
