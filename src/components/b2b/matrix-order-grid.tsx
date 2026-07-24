"use client";

import * as React from "react";
import { Minus, Plus, RefreshCcw, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { Product, ProductCategory } from "@/lib/mock-db";

type MatrixOrderGridProps = {
  products: Product[];
  availableCredit: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function getDisplayUnitPrice(product: Product, quantity: number) {
  const eligibleTierPrices = product.tierPricing
    .filter((tier) => quantity >= tier.minQuantity)
    .map((tier) => tier.unitPrice);

  return eligibleTierPrices.length > 0
    ? Math.min(...eligibleTierPrices)
    : product.msrp;
}

export function MatrixOrderGrid({
  products,
  availableCredit,
}: MatrixOrderGridProps) {
  const addBulkItems = useCart((state) => state.addBulkItems);
  const [activeCategory, setActiveCategory] = React.useState<
    "All" | ProductCategory
  >("All");
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    () =>
      Object.fromEntries(products.map((product) => [product.id, product.moq])),
  );

  const categories = React.useMemo(
    () =>
      ["All", ...new Set(products.map((product) => product.category))] as const,
    [products],
  );

  const visibleProducts = products.filter(
    (product) =>
      activeCategory === "All" || product.category === activeCategory,
  );

  const selectedProducts = visibleProducts.filter(
    (product) => (quantities[product.id] ?? 0) > 0,
  );

  const projectedSubtotal = selectedProducts.reduce((sum, product) => {
    const quantity = quantities[product.id] ?? 0;
    return sum + getDisplayUnitPrice(product, quantity) * quantity;
  }, 0);

  const projectedLineCount = selectedProducts.length;
  const projectedCreditAfterAdd = Math.max(
    0,
    availableCredit - projectedSubtotal,
  );

  const updateQuantity = (productId: string, nextQuantity: number) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Number.isNaN(nextQuantity) ? 0 : Math.max(0, nextQuantity),
    }));
  };

  const resetToMoq = () => {
    setQuantities(
      Object.fromEntries(products.map((product) => [product.id, product.moq])),
    );
  };

  const handleAddSelected = () => {
    addBulkItems(
      selectedProducts.map((product) => ({
        product,
        quantity: Math.max(product.moq, quantities[product.id] ?? 0),
      })),
    );
  };

  return (
    <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingCart className="size-4 text-sky-600" />
              Quick order matrix
            </CardTitle>
            <CardDescription>
              Build a bulk cart from MOQ-driven line items and tiered wholesale
              pricing.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={resetToMoq}>
              <RefreshCcw className="size-4" />
              Reset to MOQ
            </Button>
            <Button size="sm" onClick={handleAddSelected}>
              Add selected to cart
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(activeCategory === category && "shadow-md")}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-[minmax(0,1.7fr)_90px_90px_90px_120px] gap-px bg-slate-200 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <div className="bg-white px-4 py-3 dark:bg-slate-950">
                Product
              </div>
              <div className="bg-white px-4 py-3 text-right dark:bg-slate-950">
                MOQ
              </div>
              <div className="bg-white px-4 py-3 text-right dark:bg-slate-950">
                Stock
              </div>
              <div className="bg-white px-4 py-3 text-right dark:bg-slate-950">
                Qty
              </div>
              <div className="bg-white px-4 py-3 text-right dark:bg-slate-950">
                Unit price
              </div>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {visibleProducts.map((product) => {
                const quantity = quantities[product.id] ?? product.moq;
                const unitPrice = getDisplayUnitPrice(product, quantity);

                return (
                  <div
                    key={product.id}
                    className="grid grid-cols-[minmax(0,1.7fr)_90px_90px_90px_120px] gap-px bg-slate-200 dark:bg-slate-800"
                  >
                    <div className="bg-white px-4 py-4 dark:bg-slate-950">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-950 dark:text-white">
                            {product.name}
                          </p>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {product.sku} · {product.category}
                          </p>
                        </div>
                        <Badge variant="outline" className="whitespace-nowrap">
                          From{" "}
                          {formatCurrency(
                            Math.min(
                              ...product.tierPricing.map(
                                (tier) => tier.unitPrice,
                              ),
                            ),
                          )}
                        </Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                        {product.tierPricing.map((tier) => (
                          <span
                            key={tier.minQuantity}
                            className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-900"
                          >
                            {tier.minQuantity}+ {formatCurrency(tier.unitPrice)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white px-4 py-4 text-right text-sm dark:bg-slate-950">
                      {product.moq}
                    </div>
                    <div className="bg-white px-4 py-4 text-right text-sm dark:bg-slate-950">
                      {product.stockLevel.toLocaleString()}
                    </div>
                    <div className="bg-white px-4 py-4 dark:bg-slate-950">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              Math.max(0, quantity - 1),
                            )
                          }
                        >
                          <Minus className="size-4" />
                        </Button>
                        <Input
                          type="number"
                          min={0}
                          max={product.stockLevel}
                          value={quantity}
                          onChange={(event) =>
                            updateQuantity(
                              product.id,
                              Number(event.target.value),
                            )
                          }
                          className="h-9 w-20 text-right"
                        />
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-4 text-right text-sm font-medium text-slate-950 dark:bg-slate-950 dark:text-white">
                      {formatCurrency(unitPrice)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-200 bg-slate-50 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Selection summary</CardTitle>
                <CardDescription>
                  Projected cart impact before bulk add.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Selected lines
                  </span>
                  <span className="font-medium">{projectedLineCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Projected subtotal
                  </span>
                  <span className="font-medium">
                    {formatCurrency(projectedSubtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Credit after add
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      projectedCreditAfterAdd < 0 && "text-destructive",
                    )}
                  >
                    {formatCurrency(projectedCreditAfterAdd)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Visibility</CardTitle>
                <CardDescription>
                  Quick-order lane is optimized for bulk procurement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <p>
                  • Default quantities are set to MOQ so every visible line can
                  be sent in one add action.
                </p>
                <p>
                  • Tier pricing updates as quantities move across volume
                  thresholds.
                </p>
                <p>
                  • The checkout form below validates against available credit
                  before submission.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
