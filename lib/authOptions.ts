import {
  Account,
  NextAuthOptions,
  Profile,
  User as AuthUser,
  getServerSession,
  DefaultSession,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import dbConnect from "@/database/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/database/clientPromise";
import { AdapterUser } from "next-auth/adapters";
import { getOneUser } from "./actions/user.actions";
import { validatePassword } from "./utils";

// not completely sure how this part works here or if I need it.
declare module "next-auth" {
  export interface Session {
    user: {
      _id: string;
    } & DefaultSession["user"];
  }
}
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise!, { databaseName: "git_note" }),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  // what exactly is the purpose of these , is it for logging purposes?
  events: {
    createUser: async (message) => {},
    updateUser: async (message) => {},
  },
  providers: [
    // what specifically do i need to get back from github in my authorize function
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
      // TODO: im a little confused as to how the signin flow works, since a signUp needs to create a new user and the form has
      // TODO: extra data (full name) and needs some way of flagging this afterr sign up to redirect to onboarding
      credentials: {
        username: { label: "Email", type: "email", placeholder: "..." },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // TODO: confused about where exactly things need to be encapsulated regarding server/client side logic asnd this file and the button
        // that triggers the signIn process.
        await dbConnect();
        if (credentials?.password! || credentials?.username! === null)
          return null;
        try {
          const user = await getOneUser(credentials?.username!);

          if (user) {
            const isMatch = await validatePassword(
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
      if (params.account?.provider === "github") {
        // TODO: not sure which fields exactly i need back from github
        // return params.user.id;
      }
      return true;
    },
    // while i kind of understand whats happening here, i also kind of don't
    async jwt({ token, user, account }: any) {
      if (account) {
        console.log("Adding user to token", account);
        token.accessToken = account?.accessToken;
        if (user) {
          return { ...token, _id: user._id };
        }
      }
      return token;
    },
    // same as above
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
// this is supposed to be a wrapper for the session , on which component should the wrapper go though, the main layout a la Clerk?
export const getSession = async () => await getServerSession(authOptions);
