export interface User {
  userId: number;
  avatarUrl: string | null;
  fullName: string;
  username: string;
  email: string;
}

export interface UserRefreshToken {
  accessToken: string;
  refreshToken: string;
}
