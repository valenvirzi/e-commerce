import { Clock3, FileDown, ReceiptText, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { getOrdersByUserId, getUserByEmail } from "@/lib/mock-db";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function B2BOrdersPage() {
  const user = await getUserByEmail("wholesale-partner@company.com");

  if (!user) {
    throw new Error("B2B user fixture is missing.");
  }

  const orders = await getOrdersByUserId(user.id);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <Badge
              variant="secondary"
              className="w-fit bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-100"
            >
              PO ledger
            </Badge>
            <CardTitle className="mt-2 text-3xl tracking-tight">
              Wholesale order history and invoice status.
            </CardTitle>
            <CardDescription>
              Review pending invoices, shipped orders, and trade-credit
              commitments from one ledger.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total orders
              </p>
              <p className="mt-2 text-2xl font-semibold">{orders.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pending invoices
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {
                  orders.filter((order) => order.status === "PENDING_INVOICE")
                    .length
                }
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total spend
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {currencyFormatter.format(
                  orders.reduce((sum, order) => sum + order.totalAmount, 0),
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <Clock3 className="size-4 text-amber-300" />
              Invoice aging
            </CardTitle>
            <CardDescription className="text-slate-300">
              The latest trade-credit order is the next item to clear.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-slate-300">
                    {new Date(order.date).toLocaleDateString("en-US")}
                  </p>
                </div>
                <Badge
                  variant={
                    order.status === "PENDING_INVOICE" ? "secondary" : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ReceiptText className="size-4 text-sky-600" />
              Ledger
            </CardTitle>
            <CardDescription>
              Recent B2B transactions and fulfillment status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "PENDING_INVOICE"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {currencyFormatter.format(order.totalAmount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileDown className="size-4 text-emerald-600" />
              Export tools
            </CardTitle>
            <CardDescription>
              Mock action buttons for the procurement workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Download invoice CSV
            </Button>
            <Button variant="outline" className="w-full">
              Export PO ledger
            </Button>
            <Button variant="outline" className="w-full">
              Archive shipped orders
            </Button>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
              <div className="flex items-center gap-2 font-medium text-slate-950 dark:text-white">
                <Truck className="size-4 text-sky-600" />
                Order fulfillment
              </div>
              <p className="mt-2">
                The ledger is ready for an export or shipment-review action once
                a real backend is connected.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
