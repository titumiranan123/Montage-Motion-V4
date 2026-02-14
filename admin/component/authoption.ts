/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        const data = await res.json();
        console.log("adfkaf ================>", data);
        if (!res.ok || !data?.userdata) {
          // ❌ throw Error for NextAuth
          throw new Error("Invalid credentials");
        }
        return data.userdata;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 5 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return baseUrl + url;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
