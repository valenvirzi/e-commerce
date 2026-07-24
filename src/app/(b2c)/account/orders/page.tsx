import Link from "next/link";
import { ArrowRight, PackageCheck, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrdersByUserId, getUserByEmail } from "@/lib/mock-db";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default async function B2COrdersPage() {
  const user = await getUserByEmail("retail-buyer@example.com");

  if (!user) {
    throw new Error("B2C user fixture is missing.");
  }

  const orders = await getOrdersByUserId(user.id);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
        <CardHeader>
          <Badge
            variant="secondary"
            className="w-fit bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-100"
          >
            Orders
          </Badge>
          <CardTitle className="mt-2 text-3xl tracking-tight">
            Order history and shipment status.
          </CardTitle>
          <CardDescription>
            Track recent consumer purchases and quickly start another basket.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PackageCheck className="size-4 text-sky-600" />
              Recent orders
            </CardTitle>
            <CardDescription>Your paid consumer orders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-950 dark:text-white">
                      {order.id}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(order.date).toLocaleDateString("en-US")}
                    </div>
                  </div>
                  <Badge>{order.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Total
                  </span>
                  <span className="font-medium">
                    {formatCurrency(order.totalAmount)}
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

        <Card className="border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <RotateCcw className="size-4 text-emerald-300" />
              Buy again
            </CardTitle>
            <CardDescription className="text-slate-300">
              Jump back into the catalog and repeat a previous order pattern.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-300">
              The consumer history page is ready for a future single-click
              re-order action.
            </p>
            <Link
              href="/products"
              className={buttonVariants({ variant: "default" }) + " w-full"}
            >
              Browse products
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
