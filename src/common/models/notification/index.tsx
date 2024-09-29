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
