import Link from "next/link";
import {
  Activity,
  BadgeDollarSign,
  ChartColumnBig,
  Download,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";

import { CategorySpendChart } from "@/components/b2b/category-spend-chart";
import { CreditHealthCard } from "@/components/b2b/credit-health-card";
import { InvoiceAgingChart } from "@/components/b2b/invoice-aging-chart";
import { MonthlyPurchaseTrendChart } from "@/components/b2b/monthly-purchase-trend-chart";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getB2BAnalytics,
  getOrdersByUserId,
  getProducts,
  getUserByEmail,
} from "@/lib/mock-db";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

export default async function B2BAnalyticsPage() {
  const user = await getUserByEmail("wholesale-partner@company.com");

  if (!user) {
    throw new Error("B2B user fixture is missing.");
  }

  const [analytics, orders, products] = await Promise.all([
    getB2BAnalytics(user.id),
    getOrdersByUserId(user.id),
    getProducts(),
  ]);

  const monthlyTrendData = analytics.monthlyCategorySpend.map((point) => ({
    month: point.month,
    total: point.total,
  }));

  const invoiceAgingData = [
    { bucket: "0-30", amount: analytics.creditHealth.upcomingDueAmount },
    {
      bucket: "31-60",
      amount: Math.max(
        0,
        Math.round(
          orders
            .filter((order) => order.status === "PENDING_INVOICE")
            .reduce((sum, order) => sum + order.totalAmount, 0) * 0.2,
        ),
      ),
    },
    { bucket: "61-90", amount: 0 },
    { bucket: "90+", amount: 0 },
  ];

  const activePos = orders.filter(
    (order) => order.status === "PENDING_INVOICE",
  ).length;
  const dueAlerts = orders.filter(
    (order) => order.paymentMethod === "NET_30",
  ).length;
  const savingsRate =
    analytics.savings.totalMsrpValue === 0
      ? 0
      : analytics.savings.totalSaved / analytics.savings.totalMsrpValue;

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

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <MonthlyPurchaseTrendChart data={monthlyTrendData} />
        <InvoiceAgingChart data={invoiceAgingData} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PackageSearch className="size-4 text-sky-600" />
              Top reordered products
            </CardTitle>
            <CardDescription>
              Reorder the SKUs your team consumes the fastest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Qty bought</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.topPurchasedProducts.map((item) => {
                  const product = products.find(
                    (entry) => entry.id === item.productId,
                  );

                  return (
                    <TableRow key={item.productId}>
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div>{item.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {product?.category ?? "Category unavailable"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell className="text-right">
                        {item.totalQuantityBought}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.stockLevel.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href="/dashboard/quick-order"
                          className={buttonVariants({
                            variant: "outline",
                            size: "xs",
                          })}
                        >
                          Reorder
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Download className="size-4 text-emerald-600" />
              Quick actions
            </CardTitle>
            <CardDescription>
              Export and reorder shortcuts for procurement review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/quick-order"
                className={buttonVariants({ variant: "default" })}
              >
                <PackageSearch className="size-4" />
                Open quick order
              </Link>
              <button
                className={buttonVariants({ variant: "outline" })}
                type="button"
              >
                <Download className="size-4" />
                Export CSV
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Active POs
                </div>
                <div className="mt-1 text-2xl font-semibold">{activePos}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Net 30 due alerts
                </div>
                <div className="mt-1 text-2xl font-semibold">{dueAlerts}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Credit utilization
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {percentageFormatter.format(
                    analytics.creditHealth.currentBalance /
                      analytics.creditHealth.creditLimit,
                  )}
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Savings ROI
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {percentageFormatter.format(savingsRate)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
