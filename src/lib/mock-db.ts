// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export type UserRole = "B2C" | "B2B";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  creditLimit?: number; // B2B: Total trade credit ($) [cite: 96]
  availableCredit?: number; // B2B: Remaining credit ($) [cite: 96]
  paymentTerms?: string; // B2B: e.g., "Net 30" [cite: 96]
}

export interface TierPrice {
  minQuantity: number;
  unitPrice: number;
  discountPercentage: number;
}

export type ProductCategory =
  | "Office Supplies"
  | "Industrial Gear"
  | "Personal Care";

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  image: string;
  msrp: number; // B2C price per unit [cite: 97]
  stockLevel: number; // Real-time inventory count
  moq: number; // Minimum Order Quantity (1 for B2C) [cite: 97]
  tierPricing: TierPrice[]; // B2B bulk pricing breakdown [cite: 97]
}

export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = "PAID" | "PENDING_INVOICE" | "PROCESSING" | "SHIPPED";
export type PaymentMethod = "CREDIT_CARD" | "NET_30";

export interface Order {
  id: string;
  userId: string;
  date: string; // ISO date string
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  poNumber?: string; // B2B specific [cite: 70]
  apEmail?: string; // B2B Accounts Payable email [cite: 71]
}

// --- Analytics Types ---

export interface CategorySpendTrend {
  month: string;
  officeSupplies: number;
  industrialGear: number;
  personalCare: number;
  total: number;
}

export interface CreditHealth {
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  upcomingDueAmount: number;
  nextDueDate: string;
}

export interface SavingsMetric {
  totalMsrpValue: number;
  actualPaidValue: number;
  totalSaved: number;
  savingsPercentage: number;
}

export interface B2BAnalyticsSummary {
  creditHealth: CreditHealth;
  savings: SavingsMetric;
  monthlyCategorySpend: CategorySpendTrend[];
  topPurchasedProducts: {
    productId: string;
    sku: string;
    name: string;
    totalQuantityBought: number;
    lastOrderedDate: string;
    stockLevel: number;
  }[];
}

export interface B2CAnalyticsSummary {
  monthlySpend: { month: string; spend: number }[];
  categorySpend: { category: ProductCategory; amount: number }[];
}

// ==========================================
// 2. MOCK DATASETS
// ==========================================

export const MOCK_USERS: User[] = [
  {
    id: "usr_b2c_01",
    name: "Sarah Jenkins",
    email: "retail-buyer@example.com",
    role: "B2C",
  },
  {
    id: "usr_b2b_01",
    name: "Marcus Vance (Procurement Specialist)",
    email: "wholesale-partner@company.com",
    role: "B2B",
    companyName: "Apex Logistics & Construction Corp",
    creditLimit: 25000,
    availableCredit: 16450,
    paymentTerms: "Net 30",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    sku: "OFF-CHR-001",
    name: "Ergonomic Mesh Executive Chair",
    description:
      "High-back breathable mesh chair with lumbar support and adjustable armrests.",
    category: "Office Supplies",
    image:
      "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=600&auto=format&fit=crop",
    msrp: 249.99,
    stockLevel: 142,
    moq: 1,
    tierPricing: [
      { minQuantity: 1, unitPrice: 249.99, discountPercentage: 0 },
      { minQuantity: 10, unitPrice: 219.99, discountPercentage: 12 },
      { minQuantity: 50, unitPrice: 189.99, discountPercentage: 24 },
    ],
  },
  {
    id: "prod_02",
    sku: "IND-MSK-100",
    name: "N95 Heavy-Duty Industrial Respirators (Pack of 20)",
    description:
      "NIOSH-certified particulate respirators for construction and hazardous environments.",
    category: "Industrial Gear",
    image:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&auto=format&fit=crop",
    msrp: 34.5,
    stockLevel: 1850,
    moq: 5,
    tierPricing: [
      { minQuantity: 5, unitPrice: 34.5, discountPercentage: 0 },
      { minQuantity: 50, unitPrice: 28.0, discountPercentage: 18 },
      { minQuantity: 200, unitPrice: 22.5, discountPercentage: 34 },
    ],
  },
  {
    id: "prod_03",
    sku: "IND-GLV-050",
    name: "Heavy-Duty Nitrile Work Gloves (Box of 100)",
    description:
      "8-mil thick diamond-textured nitrile gloves providing maximum puncture resistance.",
    category: "Industrial Gear",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop",
    msrp: 22.0,
    stockLevel: 3200,
    moq: 10,
    tierPricing: [
      { minQuantity: 10, unitPrice: 22.0, discountPercentage: 0 },
      { minQuantity: 100, unitPrice: 17.5, discountPercentage: 20 },
      { minQuantity: 500, unitPrice: 14.0, discountPercentage: 36 },
    ],
  },
  {
    id: "prod_04",
    sku: "CARE-SAN-005",
    name: "Touchless Automatic Hand Sanitizer Station (1L)",
    description:
      "Commercial wall-mount automatic dispenser with heavy-duty floor stand.",
    category: "Personal Care",
    image:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=600&auto=format&fit=crop",
    msrp: 89.99,
    stockLevel: 64,
    moq: 1,
    tierPricing: [
      { minQuantity: 1, unitPrice: 89.99, discountPercentage: 0 },
      { minQuantity: 10, unitPrice: 75.0, discountPercentage: 16 },
      { minQuantity: 25, unitPrice: 62.0, discountPercentage: 31 },
    ],
  },
  {
    id: "prod_05",
    sku: "OFF-PPR-A4",
    name: "Multi-Purpose Printer Paper Ream (500 Sheets)",
    description:
      "20lb brightness standard copy paper optimized for high-volume laser printing.",
    category: "Office Supplies",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop",
    msrp: 8.99,
    stockLevel: 8500,
    moq: 5,
    tierPricing: [
      { minQuantity: 5, unitPrice: 8.99, discountPercentage: 0 },
      { minQuantity: 50, unitPrice: 7.2, discountPercentage: 20 },
      { minQuantity: 200, unitPrice: 5.5, discountPercentage: 38 },
    ],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord_b2c_101",
    userId: "usr_b2c_01",
    date: "2026-06-14T10:30:00Z",
    items: [
      {
        productId: "prod_01",
        name: "Ergonomic Mesh Executive Chair",
        sku: "OFF-CHR-001",
        quantity: 1,
        unitPrice: 249.99,
        totalPrice: 249.99,
      },
    ],
    totalAmount: 249.99,
    status: "PAID",
    paymentMethod: "CREDIT_CARD",
  },
  {
    id: "ord_b2b_201",
    userId: "usr_b2b_01",
    date: "2026-07-02T14:15:00Z",
    poNumber: "PO-99482-APEX",
    apEmail: "ap@apexlogistics.com",
    items: [
      {
        productId: "prod_02",
        name: "N95 Heavy-Duty Industrial Respirators",
        sku: "IND-MSK-100",
        quantity: 100,
        unitPrice: 22.5,
        totalPrice: 2250.0,
      },
      {
        productId: "prod_03",
        name: "Heavy-Duty Nitrile Work Gloves",
        sku: "IND-GLV-050",
        quantity: 200,
        unitPrice: 17.5,
        totalPrice: 3500.0,
      },
    ],
    totalAmount: 5750.0,
    status: "PENDING_INVOICE",
    paymentMethod: "NET_30",
  },
];

// ==========================================
// 3. ASYNC MOCK DATABASE ACCESSORS
// ==========================================

// Helper function to simulate real network latency [cite: 99, 101]
const simulateLatency = (ms = 700) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  await simulateLatency();
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  await simulateLatency();
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await simulateLatency(300);
  return MOCK_USERS.find((u) => u.email === email) || null;
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  await simulateLatency();
  return MOCK_ORDERS.filter((o) => o.userId === userId);
}

// B2C Simple Spending Analytics
export async function getB2CAnalytics(
  userId: string,
): Promise<B2CAnalyticsSummary> {
  await simulateLatency(500);

  return {
    monthlySpend: [
      { month: "Feb", spend: 120 },
      { month: "Mar", spend: 340 },
      { month: "Apr", spend: 80 },
      { month: "May", spend: 610 },
      { month: "Jun", spend: 250 },
      { month: "Jul", spend: 450 },
    ],
    categorySpend: [
      { category: "Office Supplies", amount: 850 },
      { category: "Personal Care", amount: 600 },
      { category: "Industrial Gear", amount: 400 },
    ],
  };
}

// Refined B2B Merchant-to-Buyer Transaction Intelligence [cite: 127]
export async function getB2BAnalytics(
  userId: string,
): Promise<B2BAnalyticsSummary> {
  await simulateLatency(600);

  return {
    creditHealth: {
      creditLimit: 25000,
      currentBalance: 8550,
      availableCredit: 16450,
      upcomingDueAmount: 5750,
      nextDueDate: "2026-08-01T00:00:00Z",
    },
    savings: {
      totalMsrpValue: 18400,
      actualPaidValue: 14250,
      totalSaved: 4150,
      savingsPercentage: 22.5,
    },
    monthlyCategorySpend: [
      {
        month: "Feb",
        officeSupplies: 1200,
        industrialGear: 1500,
        personalCare: 500,
        total: 3200,
      },
      {
        month: "Mar",
        officeSupplies: 1400,
        industrialGear: 2600,
        personalCare: 800,
        total: 4800,
      },
      {
        month: "Apr",
        officeSupplies: 1100,
        industrialGear: 2200,
        personalCare: 800,
        total: 4100,
      },
      {
        month: "May",
        officeSupplies: 1800,
        industrialGear: 3200,
        personalCare: 1200,
        total: 6200,
      },
      {
        month: "Jun",
        officeSupplies: 1500,
        industrialGear: 3100,
        personalCare: 1200,
        total: 5800,
      },
      {
        month: "Jul",
        officeSupplies: 2100,
        industrialGear: 4800,
        personalCare: 1650,
        total: 8550,
      },
    ],
    topPurchasedProducts: [
      {
        productId: "prod_02",
        sku: "IND-MSK-100",
        name: "N95 Heavy-Duty Respirators",
        totalQuantityBought: 450,
        lastOrderedDate: "2026-07-02",
        stockLevel: 1850,
      },
      {
        productId: "prod_03",
        sku: "IND-GLV-050",
        name: "Heavy-Duty Nitrile Gloves",
        totalQuantityBought: 800,
        lastOrderedDate: "2026-07-02",
        stockLevel: 3200,
      },
      {
        productId: "prod_05",
        sku: "OFF-PPR-A4",
        name: "Printer Paper Ream (500 Sheets)",
        totalQuantityBought: 250,
        lastOrderedDate: "2026-06-18",
        stockLevel: 8500,
      },
    ],
  };
}
