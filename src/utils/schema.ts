import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

export const verifyTokenSchema = Yup.object().shape({
  token: Yup.string().trim().required("Token is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  token: Yup.string().trim().required("Token is required"),
  newPassword: Yup.string().trim().required("New password is required"),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required("Current password is required"),
  newPassword: Yup.string()
    .trim()
    .required("New password is required")
    .test("passwords-match", "New password must be different from the current password", function (value) {
      const currentPassword = this.parent.currentPassword;
      return value !== currentPassword;
    }),
});

export const shortenUrlSchema = Yup.object().shape({
  longUrl: Yup.string().trim().url("Invalid url").required("Url is required"),
});
