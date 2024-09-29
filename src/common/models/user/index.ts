export interface User {
  userId: number;
  avatarUrl: string;
  fullName: string;
  username: string;
  email: string;
}

export interface UserRefreshToken {
  accessToken: string;
  refreshToken: string;
}
