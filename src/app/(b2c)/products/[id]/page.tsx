import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import { ProductCard } from "@/components/b2c/product-card";
import { TierPriceBadge } from "@/components/shared/tier-price-badge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductById } from "@/lib/mock-db";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Product not found
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          The requested product is no longer available in the mock catalog.
        </p>
        <Link
          href="/products"
          className={buttonVariants({ variant: "default" })}
        >
          <ArrowLeft className="size-4" />
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800 dark:text-sky-300"
        >
          <ArrowLeft className="size-4" />
          Back to catalog
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={900}
            unoptimized
            className="h-[420px] w-full object-cover"
          />
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <TierPriceBadge product={product} />
            </div>
            <CardTitle className="mt-2 text-3xl tracking-tight">
              {product.name}
            </CardTitle>
            <CardDescription>{product.sku}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">
              {product.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  MSRP
                </div>
                <div className="mt-1 text-xl font-semibold">
                  {formatCurrency(product.msrp)}
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  MOQ
                </div>
                <div className="mt-1 text-xl font-semibold">{product.moq}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Stock
                </div>
                <div className="mt-1 text-xl font-semibold">
                  {product.stockLevel.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <ShoppingBag className="size-4 text-sky-300" />
                Buy now
              </CardTitle>
              <CardDescription className="text-slate-300">
                Add the minimum order quantity directly to your cart.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductCard product={product} fullWidth />
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-emerald-600" />
                Volume pricing
              </CardTitle>
              <CardDescription>
                Tiered pricing updates as quantities cross volume breaks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.tierPricing.map((tier) => (
                <div
                  key={tier.minQuantity}
                  className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900/70"
                >
                  <span className="text-slate-500 dark:text-slate-400">
                    {tier.minQuantity}+ units
                  </span>
                  <span className="font-medium">
                    {formatCurrency(tier.unitPrice)} ({tier.discountPercentage}%
                    off)
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="size-4 text-sky-600" />
                Ready to add
              </CardTitle>
              <CardDescription>
                The item can be purchased in both single-unit and bulk volumes.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
