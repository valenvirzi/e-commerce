"use client";

import * as React from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function StripeCheckoutModal({ total }: { total: number }) {
  const clearCart = useCart((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success">("idle");
  const [form, setForm] = React.useState({
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/29",
    cvc: "123",
    zip: "10001",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setStatus("success");
    }, 900);
  };

  if (status === "success") {
    return (
      <Card className="border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-300" />
            <CardTitle>Payment completed</CardTitle>
          </div>
          <CardDescription>Your B2C order was marked PAID.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-slate-500 dark:text-slate-400">
          Total charged: {formatCurrency(total)}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CreditCard className="size-4 text-sky-600" />
          Mock Stripe checkout
        </CardTitle>
        <CardDescription>
          Enter card details to complete an instant B2C purchase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Badge variant="outline">Total {formatCurrency(total)}</Badge>
          <div className="space-y-2">
            <label className="text-sm font-medium">Card number</label>
            <Input
              value={form.cardNumber}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  cardNumber: event.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry</label>
              <Input
                value={form.expiry}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    expiry: event.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CVC</label>
              <Input
                value={form.cvc}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    cvc: event.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ZIP</label>
              <Input
                value={form.zip}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    zip: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Pay now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
