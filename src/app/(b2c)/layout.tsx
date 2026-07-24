import Link from "next/link";
import { HeartHandshake, LayoutGrid, ShoppingBag, Store } from "lucide-react";

import { CartSheet } from "@/components/shared/cart-sheet";
import { UserRoleSwitcher } from "@/components/shared/user-role-switcher";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Store },
  { href: "/products", label: "Catalog", icon: LayoutGrid },
  { href: "/cart", label: "Checkout", icon: ShoppingBag },
  { href: "/account/orders", label: "Orders", icon: HeartHandshake },
];

export default function B2CLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen text-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "rounded-2xl px-3 py-2 text-sm font-semibold",
              )}
            >
              Apex Supply Network
            </Link>
            <div className="ml-auto flex items-center gap-3">
              <CartSheet />
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "rounded-2xl",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <UserRoleSwitcher />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
