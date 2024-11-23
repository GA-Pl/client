export interface IUser {
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  userId?: number;
  profileImg?: string;
}
