import User from "@/models/users";
import { verifyPassword } from "@/utilities/auth";
import ConnectDB from "@/utilities/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await ConnectDB();
        } catch (error) {
          throw new Error("error in connecting to DB");
        }

        if (!email || !password) {
          throw new Error("invalid Data!");
        }
        const existedUser = await User.findOne({ email: email });

        if (!existedUser) {
          throw new Error("User doesn't exist!");
        }

        const isValid = await verifyPassword(password, existedUser.password);

        if (!isValid) {
          throw new Error("Email or Password incorrect!");
        }

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
