import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/services/axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email address" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await axios.post(`${process.env.BASE_URL_API}/auth/login`, {
          email: credentials?.email,
          password: credentials?.password,
        });

        const { user } = response.data;

        if (user) {
          return { ...user, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});
