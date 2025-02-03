import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        let user = null;
        user = {
          id: "122",
          email: "test@ndm.com",
          password: "test1234"
        }
        if (!user) {
          console.error("Invalid credentials.")
        }
        return user
      },
    }),
  ],
})