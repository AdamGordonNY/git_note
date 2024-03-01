import {
  Account,
  NextAuthOptions,
  Profile,
  User as AuthUser,
  getServerSession,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import dbConnect from "@/database/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/database/clientPromise";
import User from "@/database/models/user.model";
import { AdapterUser } from "next-auth/adapters";
import * as bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise!, { databaseName: "git_note" }),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "..." },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        if (credentials === null) return null;
        try {
          const user = await User.findOne({
            email: credentials?.username,
            password: credentials?.password,
          });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials!.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(params: {
      user: AuthUser | AdapterUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }): Promise<boolean> {
      if (params.account?.provider === "google") {
        return params.profile?.email?.endsWith("@gmail.com") ?? false;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export const getSession = async () => await getServerSession(authOptions);
