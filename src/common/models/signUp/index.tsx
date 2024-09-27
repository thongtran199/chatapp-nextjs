export interface AccountSignUp {
  fullName: boolean;
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface RegisterResponse {
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
