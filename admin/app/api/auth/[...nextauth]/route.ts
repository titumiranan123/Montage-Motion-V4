/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/component/authoption";
import NextAuth from "next-auth";

// process.env.NEXTAUTH_SECRET
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
