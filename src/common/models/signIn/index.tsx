export interface SignInRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    userId: number;
    fullName: string;
    username: string;
    email: string;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
