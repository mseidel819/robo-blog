import { verifyPassword } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "sdfsd",
  providers: [
    CredentialsProvider({
      name: "credentials",
      authorize: async (credentials, req) => {
        const client = await connectToDb();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("no user found");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("could not log in");
        }
        client.close();

        return {
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
