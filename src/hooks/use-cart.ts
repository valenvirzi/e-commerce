import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/mock-db";

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  addBulkItems: (items: { product: Product; quantity: number }[]) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

function resolveTieredUnitPrice(product: Product, quantity: number) {
  const eligibleTierPrices = product.tierPricing
    .filter((tier) => quantity >= tier.minQuantity)
    .map((tier) => tier.unitPrice);

  if (eligibleTierPrices.length === 0) {
    return product.msrp;
  }

  return Math.min(...eligibleTierPrices);
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (i) => i.product.id === product.id,
        );

        if (existingItem) {
          const newQty = existingItem.quantity + quantity;
          set({
            items: currentItems.map((i) =>
              i.product.id === product.id
                ? {
                    ...i,
                    quantity: newQty,
                    unitPrice: resolveTieredUnitPrice(product, newQty),
                  }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              {
                product,
                quantity,
                unitPrice: resolveTieredUnitPrice(product, quantity),
              },
            ],
          });
        }
      },
      addBulkItems: (bulkItems) => {
        const currentItems = [...get().items];
        bulkItems.forEach(({ product, quantity }) => {
          if (quantity <= 0) return;
          const idx = currentItems.findIndex(
            (i) => i.product.id === product.id,
          );
          if (idx > -1) {
            currentItems[idx].quantity += quantity;
            currentItems[idx].unitPrice = resolveTieredUnitPrice(
              product,
              currentItems[idx].quantity,
            );
          } else {
            currentItems.push({
              product,
              quantity,
              unitPrice: resolveTieredUnitPrice(product, quantity),
            });
          }
        });
        set({ items: currentItems });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.quantity * item.unitPrice,
          0,
        ),
    }),
    { name: "shopping-cart-storage" },
  ),
);
