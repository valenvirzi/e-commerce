import Link from "next/link";
import { ArrowRight, Sparkles, Truck } from "lucide-react";

import { ProductCard } from "@/components/b2c/product-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProducts } from "@/lib/mock-db";

export default async function B2CHomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <CardHeader>
            <Badge className="w-fit bg-white/10 text-white hover:bg-white/10">
              B2C storefront
            </Badge>
            <CardTitle className="mt-2 max-w-3xl text-4xl tracking-tight sm:text-5xl">
              Shop office, safety, and care essentials with a polished retail
              experience.
            </CardTitle>
            <CardDescription className="max-w-2xl text-slate-300">
              Fast discovery, clear pricing, and an instant checkout flow for
              consumer buyers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className={buttonVariants({ variant: "default" })}
            >
              Browse catalog <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-3xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Go to checkout
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-4 text-sky-600" />
                Retail convenience
              </CardTitle>
              <CardDescription>
                Consumer-friendly cards and a simple card checkout.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="size-4 text-emerald-600" />
                Fast delivery ready
              </CardTitle>
              <CardDescription>
                Built to surface stock, price, and order details up front.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured products
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A curated set of high-demand retail picks.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-sky-700 hover:text-sky-800 dark:text-sky-300"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
