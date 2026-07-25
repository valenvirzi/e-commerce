import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/lib/mock-db";

export const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  "apex-supply-network-dev-secret";

export const authConfig = {
  secret: authSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";

        if (!email) {
          return null;
        }

        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
          creditLimit: user.creditLimit,
          availableCredit: user.availableCredit,
          paymentTerms: user.paymentTerms,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.companyName = user.companyName;
        token.creditLimit = user.creditLimit;
        token.availableCredit = user.availableCredit;
        token.paymentTerms = user.paymentTerms;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role;
        session.user.companyName = token.companyName;
        session.user.creditLimit = token.creditLimit;
        session.user.availableCredit = token.availableCredit;
        session.user.paymentTerms = token.paymentTerms;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
