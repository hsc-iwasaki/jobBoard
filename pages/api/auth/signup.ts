import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import db from "../../lib/db";
const { SECRET } = process.env;
export const authOptions = {
  providers: [
    CredentialsProvider({
      // サインインフォームに表示する名前 (例: "Sign in with...")
      name: "E-mail/Password",
      credentials: {},
      async authorize(credentials, req) {
        const { name, email, password } = credentials;

        // ここで、データベースにユーザーを追加するロジックを書く。
        try {
          const query = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?);
          `;
          const results = await db.query(query, [name, email, password]);
          await db.end();
        } catch (error) {
          console.log(credentials);
        }
        // サインアップが成功したら、ユーザーオブジェクトを返します。
        return { name: name, email: email };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    signUp: "/auth/signup",
  },
  secret: SECRET,
};
export default NextAuth(authOptions);
