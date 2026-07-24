import Link from "next/link";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  PackageSearch,
} from "lucide-react";

import { B2BSidebar } from "@/components/b2b/b2b-sidebar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/quick-order", label: "Quick order", icon: PackageSearch },
  { href: "/dashboard/orders", label: "PO ledger", icon: ClipboardList },
];

export default function B2BLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen text-slate-950 dark:text-slate-50 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-200/80 bg-white/85 px-4 py-6 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <B2BSidebar navigation={navigation} />
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Wholesale workspace
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Apex Logistics procurement center
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-100"
              >
                Net 30 active
              </Badge>
              <Link
                href="/dashboard/quick-order"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                Start bulk order
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
