import { ArrowRight, CreditCard, Package, Truck, Users } from "lucide-react";
import Link from "next/link";

import { MatrixOrderGrid } from "@/components/b2b/matrix-order-grid";
import { PoCheckoutForm } from "@/components/b2b/po-checkout-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getB2BAnalytics, getProducts, getUserByEmail } from "@/lib/mock-db";
import { cn } from "@/lib/utils";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function QuickOrderPage() {
  const user = await getUserByEmail("wholesale-partner@company.com");

  if (!user) {
    throw new Error("B2B user fixture is missing.");
  }

  const [products, analytics] = await Promise.all([
    getProducts(),
    getB2BAnalytics(user.id),
  ]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <CardHeader>
            <Badge className="w-fit bg-white/10 text-white hover:bg-white/10">
              Quick order lane
            </Badge>
            <CardTitle className="mt-2 text-3xl tracking-tight sm:text-4xl">
              Add bulk SKUs fast, then submit a Net 30 PO in one flow.
            </CardTitle>
            <CardDescription className="max-w-2xl text-slate-300">
              MOQ-driven line items, tier pricing, and credit-aware checkout for
              wholesale replenishment.
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
              <p className="text-sm text-slate-300">Top reorder SKUs</p>
              <p className="mt-2 text-2xl font-semibold">
                {analytics.topPurchasedProducts.length}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Target due date</p>
              <p className="mt-2 text-2xl font-semibold">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date(analytics.creditHealth.nextDueDate))}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="size-4 text-sky-600" />
                Purchase summary
              </CardTitle>
              <CardDescription>
                Use the matrix to stage bulk quantity lines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Company
                </span>
                <span className="font-medium">{user.companyName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Terms
                </span>
                <span className="font-medium">{user.paymentTerms}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Credit available
                </span>
                <span className="font-medium">
                  {currencyFormatter.format(user.availableCredit ?? 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="size-4 text-amber-500" />
                Workflow
              </CardTitle>
              <CardDescription>
                Matrix order, then PO validation, then invoice review.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <p>
                • Change quantities in the matrix to reflect this week’s
                replenishment volume.
              </p>
              <p>
                • The PO form validates the cart against available credit before
                submission.
              </p>
              <p>
                • Successful submission clears the cart and marks the order
                pending invoice review.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <MatrixOrderGrid
          products={products}
          availableCredit={analytics.creditHealth.availableCredit}
        />
        <PoCheckoutForm
          companyName={user.companyName ?? "Wholesale account"}
          paymentTerms={user.paymentTerms ?? "Net 30"}
          availableCredit={analytics.creditHealth.availableCredit}
          defaultApEmail="ap@apexlogistics.com"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-sky-600" />
              Bulk buyer note
            </CardTitle>
            <CardDescription>
              Designed for procurement specialists and operations managers.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-500 dark:text-slate-400">
            Faster than a product-by-product cart, with credit visibility built
            into the checkout step.
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="size-4 text-emerald-600" />
              Credit-aware flow
            </CardTitle>
            <CardDescription>
              Cart total and available credit stay visible as you build the
              order.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-500 dark:text-slate-400">
            The checkout rejects submissions that would exceed the trade limit.
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="text-base">Next step</CardTitle>
            <CardDescription>
              Jump to the order ledger after submitting a PO.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/dashboard/orders"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              View order ledger <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
