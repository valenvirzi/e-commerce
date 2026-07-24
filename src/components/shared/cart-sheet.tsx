"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function CartSheet() {
  const [open, setOpen] = React.useState(false);
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const total = useCart((state) => state.getTotal());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        className="shrink-0"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="size-4" />
        Cart ({items.length})
      </Button>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
          <SheetDescription>
            Review your items before heading to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-3 overflow-auto px-6 pb-6 pt-2">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
              Your cart is empty. Add products from the catalog to start a
              checkout.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-950 dark:text-white">
                      {item.product.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {item.quantity} x {formatCurrency(item.unitPrice)}
                    </div>
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
        </div>

        <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
            <span className="font-medium">{formatCurrency(total)}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href="/cart"
              className={cn(buttonVariants({ variant: "default" }), "flex-1")}
              onClick={() => setOpen(false)}
            >
              Go to checkout
            </Link>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
