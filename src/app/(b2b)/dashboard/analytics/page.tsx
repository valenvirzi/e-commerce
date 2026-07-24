import {
  Activity,
  BadgeDollarSign,
  ChartColumnBig,
  ShieldCheck,
} from "lucide-react";

import { CategorySpendChart } from "@/components/b2b/category-spend-chart";
import { CreditHealthCard } from "@/components/b2b/credit-health-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getB2BAnalytics, getUserByEmail } from "@/lib/mock-db";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function B2BAnalyticsPage() {
  const user = await getUserByEmail("wholesale-partner@company.com");

  if (!user) {
    throw new Error("B2B user fixture is missing.");
  }

  const analytics = await getB2BAnalytics(user.id);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <Badge
              variant="secondary"
              className="w-fit bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-100"
            >
              Procurement intelligence
            </Badge>
            <CardTitle className="mt-2 text-3xl tracking-tight">
              Spend analytics built for fast wholesale decisions.
            </CardTitle>
            <CardDescription className="max-w-2xl">
              Review category momentum, trade credit position, and savings
              efficiency without leaving the dashboard context.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <ChartColumnBig className="size-4 text-sky-600" />
                Monthly spend
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {currencyFormatter.format(
                  analytics.monthlyCategorySpend.at(-1)?.total ?? 0,
                )}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <BadgeDollarSign className="size-4 text-emerald-600" />
                Savings percentage
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {analytics.savings.savingsPercentage.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Activity className="size-4 text-amber-500" />
                Top SKU count
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {analytics.topPurchasedProducts.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <ShieldCheck className="size-4 text-emerald-300" />
              Credit position
            </CardTitle>
            <CardDescription className="text-slate-300">
              Stay within trade limits while you plan the next replenishment
              wave.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-300">Credit limit</p>
              <p className="mt-1 text-2xl font-semibold">
                {currencyFormatter.format(analytics.creditHealth.creditLimit)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-300">Current balance</p>
              <p className="mt-1 text-2xl font-semibold">
                {currencyFormatter.format(
                  analytics.creditHealth.currentBalance,
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-300">Available credit</p>
              <p className="mt-1 text-2xl font-semibold">
                {currencyFormatter.format(
                  analytics.creditHealth.availableCredit,
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <CreditHealthCard {...analytics.creditHealth} />
        <CategorySpendChart data={analytics.monthlyCategorySpend} />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {analytics.topPurchasedProducts.map((product) => (
          <Card
            key={product.productId}
            className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80"
          >
            <CardHeader>
              <CardTitle className="text-base">{product.name}</CardTitle>
              <CardDescription>{product.sku}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Qty bought
                </span>
                <span className="font-medium">
                  {product.totalQuantityBought}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Stock level
                </span>
                <span className="font-medium">
                  {product.stockLevel.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Last ordered
                </span>
                <span className="font-medium">{product.lastOrderedDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
