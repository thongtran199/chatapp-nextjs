export interface User {
  id: number;
  avatar: string;
  fullName: string;
  firstName: string;
  lastName: string;
}



export interface UserRefreshToken {
  accessToken: string;
  refreshToken: string;
}
