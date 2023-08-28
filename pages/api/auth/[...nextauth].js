import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

const { SECRET } = process.env;
export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "E-mail/Password",
      credentials: {
        role: {
          type: "text",
        },
        name: {
          label: "name",
          type: "text",
        },
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "E-mail",
        },
        password: { label: "パスワード", type: "password" },
      },
      async session(session, user) {
        session.user.id = user.sub;
        session.user.name = user.sub;
        session.user.email = user.sub;
        session.user.role = user.sub;
        session.user.companies = user.sub;
        return Promise.resolve(session);
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          throw new Error("Invalid email and/or password"); // This will display an error on the login page.
        }
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          email: token.email, // User ID
        },
        include: {
          companies: true, // Include related companies
        },
      });

      session.user.id = user.id;
      session.user.role = user.role;
      session.user.companies = user.companies;

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
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: SECRET,
};
export default NextAuth(authOptions);
