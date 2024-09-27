import { FriendshipStatus } from '@/common/enums/friendshipStatus';

export interface FoundUser {
  userId: number;
  fullName: string;
  username: string;
  avatarUrl?: string;
  friendshipStatus: FriendshipStatus;
  requesterId?: number;
}
