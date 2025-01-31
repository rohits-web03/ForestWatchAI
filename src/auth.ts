import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name:"Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        let user = null;
        user = {
          id:"122",
          email:"test@ndm.com",
          password:"test1234"
        }
        if (!user) {
          console.error("Invalid credentials.")
        }
        return user
      },
    }),
  ],
})