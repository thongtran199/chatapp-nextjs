import { FriendshipStatus } from '@/common/enums/friendshipStatus';

export interface FoundUser {
  userId: number;
  fullName: string;
  username: string;
  avatarUrl?: string;
  friendshipFoundUserResponseDTO?: FriendshipFoundUserResponseDTO;
}
export interface FriendshipFoundUserResponseDTO {
  friendshipId: number;
  friendshipStatus: FriendshipStatus;
  requesterId: number;
  requestedUserId: number;
}
