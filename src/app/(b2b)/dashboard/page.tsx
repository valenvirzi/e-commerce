import Link from "next/link";
import { ArrowRight, PackageSearch, Sparkles, TrendingUp } from "lucide-react";

import { CategorySpendChart } from "@/components/b2b/category-spend-chart";
import { CreditHealthCard } from "@/components/b2b/credit-health-card";
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

export default async function B2BDashboardPage() {
  const user = await getUserByEmail("wholesale-partner@company.com");

  if (!user) {
    throw new Error("B2B user fixture is missing.");
  }

  const [analytics, orders, products] = await Promise.all([
    getB2BAnalytics(user.id),
    getOrdersByUserId(user.id),
    getProducts(),
  ]);

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
      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/10 text-white hover:bg-white/10">
                Priority restock
              </Badge>
              <Badge
                variant="outline"
                className="border-white/20 text-white/80"
              >
                {orders.length} open procurements
              </Badge>
            </div>
            <CardTitle className="mt-2 text-3xl tracking-tight sm:text-4xl">
              High-velocity wholesale ordering, tuned for credit and stock
              visibility.
            </CardTitle>
            <CardDescription className="max-w-2xl text-slate-300">
              Monitor utilization, compare category spend, and launch bulk
              ordering from a single procurement workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Available credit</p>
              <p className="mt-2 text-2xl font-semibold">
                {currencyFormatter.format(
                  analytics.creditHealth.availableCredit,
                )}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Total savings</p>
              <p className="mt-2 text-2xl font-semibold">
                {currencyFormatter.format(analytics.savings.totalSaved)}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Net 30 exposure</p>
              <p className="mt-2 text-2xl font-semibold">
                {currencyFormatter.format(
                  analytics.creditHealth.upcomingDueAmount,
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="size-4 text-sky-600" />
                Savings ROI
              </CardTitle>
              <CardDescription>
                Realized savings versus MSRP across wholesale purchasing.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Actual paid
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {currencyFormatter.format(analytics.savings.actualPaidValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Saved vs MSRP
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {percentageFormatter.format(savingsRate)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-4 text-amber-500" />
                Quick actions
              </CardTitle>
              <CardDescription>
                Move into ordering, analytics, or invoice review.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/quick-order"
                className={buttonVariants({ variant: "default" })}
              >
                Open quick order <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dashboard/analytics"
                className={buttonVariants({ variant: "outline" })}
              >
                View analytics
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <CreditHealthCard {...analytics.creditHealth} />
        <CategorySpendChart data={analytics.monthlyCategorySpend} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PackageSearch className="size-4 text-sky-600" />
              Top purchased products
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-base">Order activity</CardTitle>
            <CardDescription>
              Recent B2B invoices and their current state.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(order.date))}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "PENDING_INVOICE"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Total
                  </span>
                  <span className="font-medium">
                    {currencyFormatter.format(order.totalAmount)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Payment
                  </span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-base">Active POs</CardTitle>
            <CardDescription>Invoices pending review.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {activePos}
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-base">Net 30 due alerts</CardTitle>
            <CardDescription>
              Orders carrying trade credit terms.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {dueAlerts}
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-base">Credit utilization</CardTitle>
            <CardDescription>Current balance versus limit.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {percentageFormatter.format(
              analytics.creditHealth.currentBalance /
                analytics.creditHealth.creditLimit,
            )}
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-base">Average order size</CardTitle>
            <CardDescription>Based on recent wholesale orders.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {currencyFormatter.format(
              orders.reduce((sum, order) => sum + order.totalAmount, 0) /
                Math.max(orders.length, 1),
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
