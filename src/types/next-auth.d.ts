import type { DefaultSession } from "next-auth";

import type { UserRole } from "@/lib/mock-db";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      companyName?: string;
      creditLimit?: number;
      availableCredit?: number;
      paymentTerms?: string;
    };
  }

  interface User {
    role: UserRole;
    companyName?: string;
    creditLimit?: number;
    availableCredit?: number;
    paymentTerms?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    companyName?: string;
    creditLimit?: number;
    availableCredit?: number;
    paymentTerms?: string;
  }
}
