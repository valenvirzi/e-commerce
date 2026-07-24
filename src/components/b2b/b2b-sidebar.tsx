import Link from "next/link";
import { type LucideIcon, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export function B2BSidebar({ navigation }: { navigation: NavigationItem[] }) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <ShieldCheck className="size-3.5" />
          Wholesale access
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Apex Supply Network
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fast replenishment, credit-aware ordering, and spend visibility.
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "w-full justify-start rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                item.href === "/dashboard" &&
                  "bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white",
              )}
              href={item.href}
            >
              <Icon className="mr-2 size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Active profile
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-950 dark:text-white">
              Marcus Vance
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Procurement specialist
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-sky-200 text-sky-700 dark:border-sky-500/40 dark:text-sky-200"
          >
            B2B
          </Badge>
        </div>
      </div>
    </div>
  );
}
