import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/mock-db";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function TierPriceBadge({
  product,
  quantity = product.moq,
}: {
  product: Product;
  quantity?: number;
}) {
  const eligibleTierPrices = product.tierPricing
    .filter((tier) => quantity >= tier.minQuantity)
    .sort((left, right) => right.minQuantity - left.minQuantity);

  const activeTier = eligibleTierPrices[0] ?? product.tierPricing[0];

  return (
    <Badge
      variant="outline"
      className="border-sky-200 text-sky-700 dark:border-sky-500/40 dark:text-sky-200"
    >
      {activeTier.minQuantity}+ {formatCurrency(activeTier.unitPrice)}
    </Badge>
  );
}
