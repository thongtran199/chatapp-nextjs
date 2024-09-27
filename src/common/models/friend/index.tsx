export interface AddFriendRequest {
  requesterId: number;
  requestedUserId: number;
}

export interface Friend {
  userId: number;
  fullName: string;
  username: string;
  avatarUrl: string;
}
