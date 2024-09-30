import { NotificationSocketTypeDTO } from '@/common/enums/notification';

export interface AddFriendRequest {
  requesterId: number;
  requestedUserId: number;
}

export interface Notification {
  notificationId: number;
  userId: string;
  type: string;
  referenceId: string;
  createdAt: string;
  seen: boolean;
}
export interface NotificationSocketDTO {
  notificationId: number;
  referenceId: number;
  seen: boolean;
  createdAt: string;
  header: string;
  content: string;
  avatarUrl: string;
  type: NotificationSocketTypeDTO;
  partnerId: number;
}
