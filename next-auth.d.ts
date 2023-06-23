import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      isVerified: boolean;
      createdAt: string | Date;
    };
  }
}
