import Link from "next/link";

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

const categories = [
  "All",
  "Office Supplies",
  "Industrial Gear",
  "Personal Care",
] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const products = await getProducts();
  const selectedCategory = searchParams?.category ?? "All";

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
        <CardHeader>
          <Badge
            variant="secondary"
            className="w-fit bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-100"
          >
            Catalog
          </Badge>
          <CardTitle className="mt-2 text-3xl tracking-tight">
            Browse the consumer catalog.
          </CardTitle>
          <CardDescription>
            Filter by category and add items directly to your cart.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              className={buttonVariants({
                variant: selectedCategory === category ? "default" : "outline",
                size: "sm",
              })}
              href={
                category === "All"
                  ? "/products"
                  : `/products?category=${encodeURIComponent(category)}`
              }
            >
              {category}
            </Link>
          ))}
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
