"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";

import { StripeCheckoutModal } from "@/components/b2c/stripe-checkout-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function CartPage() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const total = useCart((state) => state.getTotal());

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800 dark:text-sky-300"
        >
          <ArrowLeft className="size-4" />
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingBag className="size-4 text-sky-600" />
              Cart items
            </CardTitle>
            <CardDescription>
              Review your consumer basket before payment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                Your cart is empty. Explore the catalog to add products.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div>
                    <div className="font-medium text-slate-950 dark:text-white">
                      {item.product.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {item.quantity} x {formatCurrency(item.unitPrice)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-medium">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
              <CardDescription className="text-slate-300">
                Instant payment for consumer purchases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Items</span>
                <span>{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>

          <StripeCheckoutModal total={total} />

          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
