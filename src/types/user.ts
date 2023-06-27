export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  googleAuth: boolean;
}
