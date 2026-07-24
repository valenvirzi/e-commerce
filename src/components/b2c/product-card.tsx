"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TierPriceBadge } from "@/components/shared/tier-price-badge";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/lib/mock-db";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function ProductCard({
  product,
  fullWidth = false,
}: {
  product: Product;
  fullWidth?: boolean;
}) {
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => addItem(product, product.moq);

  return (
    <Card
      className={cn(
        "border-slate-200/80 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/80",
        fullWidth && "lg:grid lg:grid-cols-[0.95fr_1.05fr]",
      )}
    >
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={product.image}
          alt={product.name}
          width={1200}
          height={900}
          unoptimized
          className="h-full min-h-64 w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge className="bg-white/90 text-slate-950 hover:bg-white/90">
            {product.category}
          </Badge>
          <TierPriceBadge product={product} />
        </div>
      </div>
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-start justify-between gap-3 text-base">
            <span>{product.name}</span>
            <Button variant="ghost" size="icon-sm">
              <Heart className="size-4" />
            </Button>
          </CardTitle>
          <CardDescription>{product.sku}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
          <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900/70">
            <span className="text-slate-500 dark:text-slate-400">MSRP</span>
            <span className="font-semibold">
              {formatCurrency(product.msrp)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>MOQ {product.moq}</span>
            <span>Stock {product.stockLevel.toLocaleString()}</span>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            <Button onClick={handleAdd} className="flex-1">
              <ShoppingBag className="size-4" />
              Add to cart
            </Button>
            <Link
              href={`/products/${product.id}`}
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            >
              View details
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
