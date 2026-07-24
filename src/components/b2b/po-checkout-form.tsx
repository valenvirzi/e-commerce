"use client";

import * as React from "react";
import { CheckCircle2, FileText, Loader2, ShieldAlert } from "lucide-react";

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
import { cn } from "@/lib/utils";

type POCheckoutFormProps = {
  companyName: string;
  paymentTerms: string;
  availableCredit: number;
  defaultApEmail: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function PoCheckoutForm({
  companyName,
  paymentTerms,
  availableCredit,
  defaultApEmail,
}: POCheckoutFormProps) {
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);

  const [poNumber, setPoNumber] = React.useState("");
  const [apEmail, setApEmail] = React.useState(defaultApEmail);
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submission, setSubmission] = React.useState<null | {
    poNumber: string;
    total: number;
    submittedAt: string;
  }>(null);
  const [error, setError] = React.useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const remainingCredit = availableCredit - subtotal;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      setError("Add items to the cart before submitting a PO.");
      return;
    }

    if (!poNumber.trim()) {
      setError("PO number is required.");
      return;
    }

    if (subtotal > availableCredit) {
      setError("The current cart total exceeds available trade credit.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmission({
        poNumber: poNumber.trim(),
        total: subtotal,
        submittedAt: new Date().toLocaleString("en-US"),
      });
      clearCart();
    }, 900);
  };

  if (submission) {
    return (
      <Card className="border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-300" />
            <CardTitle>PO submitted</CardTitle>
          </div>
          <CardDescription>
            Your wholesale order is now pending invoice review for {companyName}
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              PO number
            </span>
            <span className="font-medium">{submission.poNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Submitted total
            </span>
            <span className="font-medium">
              {formatCurrency(submission.total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Submitted at
            </span>
            <span className="font-medium">{submission.submittedAt}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="size-4 text-sky-600" />
          Net 30 PO checkout
        </CardTitle>
        <CardDescription>
          Submit a trade-credit order for {companyName}. Current available
          credit: {formatCurrency(availableCredit)}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-100"
            >
              {paymentTerms}
            </Badge>
            <Badge variant="outline">
              Remaining after cart: {formatCurrency(remainingCredit)}
            </Badge>
          </div>

          {error ? (
            <div className="flex items-start gap-2 rounded-3xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              <ShieldAlert className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium">PO number</label>
            <Input
              value={poNumber}
              onChange={(event) => setPoNumber(event.target.value)}
              placeholder="PO-100245-APEX"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">AP email</label>
            <Input
              value={apEmail}
              onChange={(event) => setApEmail(event.target.value)}
              placeholder="ap@company.com"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-24 w-full rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              placeholder="Delivery window, dock instructions, or receiving notes"
            />
          </div>

          <div className="rounded-3xl bg-slate-50 p-4 text-sm dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Cart subtotal
              </span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Remaining credit
              </span>
              <span
                className={cn(
                  "font-medium",
                  remainingCredit < 0 && "text-destructive",
                )}
              >
                {formatCurrency(remainingCredit)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Submit PO for invoice review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
