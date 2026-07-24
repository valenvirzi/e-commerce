"use client";

import * as React from "react";

import { MOCK_USERS, type User, type UserRole } from "@/lib/mock-db";

const STORAGE_KEY = "active-b2c-profile";
const DEFAULT_EMAIL = "retail-buyer@example.com";

export function useUserRole() {
  const [email, setEmail] = React.useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_EMAIL;
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_EMAIL;
  });

  const currentUser = React.useMemo<User>(() => {
    return MOCK_USERS.find((user) => user.email === email) ?? MOCK_USERS[0];
  }, [email]);

  const updateProfile = (nextRole: UserRole) => {
    const nextUser =
      MOCK_USERS.find((user) => user.role === nextRole) ?? MOCK_USERS[0];
    setEmail(nextUser.email);
    window.localStorage.setItem(STORAGE_KEY, nextUser.email);
  };

  return {
    user: currentUser,
    setRole: updateProfile,
  };
}
