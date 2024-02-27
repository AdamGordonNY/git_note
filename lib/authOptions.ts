import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // Remove the 'callbacks' property from the object literal
      // to resolve the TypeScript error.
      // The 'callbacks' property is not recognized in the 'OAuthUserConfig<GithubProfile>' type.
      // You can add it back once you have the correct type definition.
      // callbacks: {
      //   async signIn({ user, account, profile, email, credentials }) {
      //     const isAllowedToSignIn = true
      //     if (isAllowedToSignIn) {
      //       return true
      //     } else {
      //       // Return false to display a default error message
      //       return false
      //       // Or you can return a URL to redirect to:
      //       // return '/unauthorized'
      //     }
      //   }
      // }
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "..." },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {},
};
