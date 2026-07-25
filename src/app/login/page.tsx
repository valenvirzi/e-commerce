"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ArrowRight, ShieldCheck, ShoppingBag, Store } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const demoAccounts = [
  {
    role: "B2C" as const,
    title: "Retail buyer",
    email: "retail-buyer@example.com",
    description:
      "Browse the consumer storefront and keep the checkout path simple.",
    icon: Store,
    actionLabel: "Enter B2C storefront",
    redirectTo: "/",
  },
  {
    role: "B2B" as const,
    title: "Wholesale partner",
    email: "wholesale-partner@company.com",
    description:
      "Access the dashboard, quick order matrix, and analytics workspace.",
    icon: ShieldCheck,
    actionLabel: "Enter B2B dashboard",
    redirectTo: "/dashboard",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (email: string, redirectTo: string) => {
    setPendingRole(email);
    setError(null);

    const result = await signIn("credentials", {
      email,
      redirect: false,
      callbackUrl: redirectTo === "/dashboard" ? callbackUrl : redirectTo,
    });

    setPendingRole(null);

    if (result?.error) {
      setError("That account could not be signed in.");
      return;
    }

    router.push(result?.url ?? redirectTo);
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-950/15 sm:px-10 sm:py-12 dark:border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.15),transparent_32%)]" />
          <div className="relative space-y-6">
            <div className="flex items-center gap-2">
              <Badge className="bg-white/10 text-white hover:bg-white/10">
                Demo auth
              </Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Sign in to the retail storefront or the wholesale dashboard.
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                This dev environment uses mock credentials backed by the seeded
                user fixtures, so you can switch roles without any external auth
                setup.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                B2C retail access
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                B2B dashboard access
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                Shared dev secret
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-white/10 bg-white/5 text-white shadow-none">
                <CardHeader>
                  <CardTitle className="text-base text-white">
                    Zero-friction local auth
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    No password reset flow, just fixture-based sign-in for demo
                    work.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/10 bg-white/5 text-white shadow-none">
                <CardHeader>
                  <CardTitle className="text-base text-white">
                    Route-aware access
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Retail stays open, while wholesale routes land on login when
                    needed.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
              {error}
            </div>
          ) : null}

          {demoAccounts.map((account) => {
            const Icon = account.icon;
            const isPending = pendingRole === account.email;

            return (
              <Card
                key={account.email}
                className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.title}</CardTitle>
                      <CardDescription>{account.email}</CardDescription>
                    </div>
                  </div>
                  <CardDescription className="pt-2 text-sm">
                    {account.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button
                    className="w-full justify-between rounded-2xl"
                    onClick={() =>
                      handleSignIn(account.email, account.redirectTo)
                    }
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : account.actionLabel}
                    <ArrowRight className="size-4" />
                  </Button>
                  {account.role === "B2B" ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use this to reach{" "}
                      <Link
                        href="/dashboard"
                        className="font-medium text-sky-700 hover:underline dark:text-sky-300"
                      >
                        /dashboard
                      </Link>{" "}
                      and the wholesale tools.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use this to reach the consumer storefront and checkout
                      flow.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingBag className="size-4 text-sky-600" />
                Direct navigation
              </CardTitle>
              <CardDescription>
                If you only need retail pages, you can skip sign-in.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
              >
                Retail home
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
              >
                Product catalog
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
