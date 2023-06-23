export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordtype {
  email: string;
}

export interface ResetPasswordType {
  token: string;
  newPassword: string;
}

export interface VerifyTokenType {
  token: string;
}

export interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
}
