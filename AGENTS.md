# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Context & System Prompt: Hybrid B2B/B2C E-Commerce (Multi-Category Mock Environment)

## 1. Role & Objective

You are an expert Frontend Engineer and Next.js architect. You are helping me build a production-grade, highly responsive hybrid B2B/B2C e-commerce application. [cite_start]The goal of this project is to showcase advanced architectural patterns, clean UX/UI separation, dynamic data visualization, and optimal performance for a frontend developer job interview[cite: 1, 3, 85].

## 2. Core Architecture & Dynamic Routing

[cite_start]We use the Next.js App Router with Route Groups to isolate the two primary user experiences:

- [cite_start]`src/app/(b2c)/`: Retail customer pages and layouts (focused on discovery, lifestyle, and simple account management)[cite: 13, 14, 20].
- [cite_start]`src/app/(b2b)/`: Wholesale business pages and layouts (focused on density, speed, analytics, and procurement management)[cite: 13, 14, 20, 108].
- [cite_start]`src/middleware.ts`: Intercepts incoming requests, reads the Auth.js session token, and automatically routes wholesale roles to `(b2b)` and retail/guest users to `(b2c)`[cite: 8, 9, 10].

## 3. Mock Authentication & Product Domain Constraints

- [cite_start]**Authentication**: Powered by Auth.js (NextAuth.js) using the `CredentialsProvider`[cite: 41]. Test accounts:
  - [cite_start]B2C Profile: `retail-buyer@example.com` [cite: 42]
  - [cite_start]B2B Profile: `wholesale-partner@company.com` [cite: 42]
- [cite_start]**Product Domain**: The store sells across multiple B2B/B2C relevant categories: Office Supplies, Industrial Protective Gear, and Personal Care Supplies[cite: 50].
- [cite_start]**Data Layer**: All data is served from `src/lib/mock-db.ts` containing rich JSON arrays for products, users, orders, and analytics[cite: 44, 95].
- [cite_start]**Latency Simulation**: Data-fetching functions are asynchronous and simulate network delay (`setTimeout`) to ensure Next.js loading skeletons and Suspense states are triggered and visible[cite: 45, 46, 99].
- **Mock DB Accessors**:
  - Products: `getProducts()`, `getProductById(id)`
  - Users: `getUserByEmail(email)`
  - Orders: `getOrdersByUserId(userId)`
  - Analytics: `getB2CAnalytics(userId)`, `getB2BAnalytics(userId)`

## 4. Realistic Data Schema Expectations

Ensure data models adhere to `src/lib/mock-db.ts`:

- [cite_start]**Products**: Contain `id`, `sku`, `name`, `description`, `category`, `image`, `msrp` (B2C price), `stockLevel`, `moq` (Minimum Order Quantity), and `tierPricing` (array of volume-based discounts)[cite: 97, 138, 139, 140, 141].
- [cite_start]**Orders**: Contain `id`, `userId`, `date`, `items`, `totalAmount`, `status` (`PAID`, `PENDING_INVOICE`, `PROCESSING`, `SHIPPED`), `paymentMethod` (`CREDIT_CARD`, `NET_30`), and optional B2B fields (`poNumber`, `apEmail`)[cite: 98, 143, 144, 145].
- [cite_start]**B2B Analytics**: Contain `creditHealth` (limit, balance, available credit, upcoming due dates), `savings` (total saved vs MSRP), `monthlyCategorySpend` (spend trends across Office, Industrial, Personal Care), and `topPurchasedProducts`[cite: 109, 110, 111, 127, 129, 131].

## 5. Tech Stack Constraints

All generated code must strictly adhere to this ecosystem:

- [cite_start]**Framework**: Next.js (App Router, React Server Components preferred for data fetching)[cite: 6, 10].
- [cite_start]**Global Client State**: Zustand (specifically for client-side cart management with `persist` middleware)[cite: 57, 59].
- [cite_start]**URL State Management**: Nuqs (for type-safe search parameters, filters, and pagination)[cite: 28].
- [cite_start]**Styling**: Tailwind CSS + shadcn/ui (highly accessible, clean utility classes)[cite: 27].
- [cite_start]**Data Visualization**: Recharts / shadcn/ui Charts (for order history trends and analytics).
- [cite_start]**Animations**: Framer Motion (for polished, smooth micro-interactions)[cite: 18, 28].

## 6. UI/UX Paradigm Rules

When generating components or pages, adapt the UI based on the target route group:

- [cite_start]**B2C Pages**: High visual impact, smooth micro-interactions, clean grid layouts, elegant slide-over carts, standard MSRP/discount text, and clean mobile bottom-nav bars[cite: 14, 15, 18, 21].
- [cite_start]**B2B Pages**: High information density, keyboard accessibility, speed, advanced data tables, stock availability grids, custom tiered volume pricing models, a "Quick Order" matrix table allowing bulk additions, and a mock CSV upload element[cite: 14, 16, 22, 23, 25].

## 7. Role-Based Checkout & Payment Logic

[cite_start]Implement conditional checkout UI based on user role[cite: 66]:

- **B2C Role**: Instant Payment via a Mock Stripe Modal (Card Number, Expiration, CVC, Zip Code). [cite_start]Submitting triggers a short loading state and returns an immediate `PAID` order status[cite: 66, 67, 68].
- **B2B Role**: Trade Credit & PO Form ("Pay on Account"). Includes mandatory PO Number input, Payment Terms Badge (e.g., Net 30 showing available vs. required credit limit), AP Email, and optional PO PDF dropzone. [cite_start]Submitting validates cart total against credit balance and sets status to `PENDING_INVOICE`[cite: 69, 70, 71, 72, 73].
- **Role Guarding**: B2C/Guest users are locked strictly to Credit Card/Stripe; [cite_start]B2B users default to Net 30/PO with an option to toggle to Credit Card[cite: 74, 75].

## 8. Role-Based Order History & Analytics

- **B2C Order History (`/account/orders`)**:
  - [cite_start]Focus: Visual shipment tracking timeline, order summary cards, personal spend donut chart, and a single-click "Buy Again" button[cite: 87, 88].
- **B2B Procurement Dashboard (`/dashboard/analytics`)**:
  - [cite_start]Focus: Merchant credit health, category purchasing trends, and volume savings ROI[cite: 127, 129, 131].
  - [cite_start]KPI Cards: Credit Line Utilization (available vs. used progress bar), Total Tier Savings ($ and % saved vs MSRP), Active POs Count, and Net 30 Due Alerts[cite: 109, 110, 111, 112].
  - [cite_start]Charts: Monthly Category Spend Breakdown (Stacked Bar or Area Chart), Monthly Purchase Trend Line, and Invoice Aging Bar[cite: 127].
  - [cite_start]Quick Actions: "Top Reordered Products" table with single-click bulk add to cart, filterable PO/invoice ledger, and CSV export[cite: 118, 119].

## 9. Coding Principles

- Write strict, type-safe TypeScript.
- [cite_start]Maximize the use of React Server Components (RSC) for initial data fetching[cite: 10].
- [cite_start]Implement Optimistic UI updates (leveraging Zustand or React hooks) for high-volume actions like bulk additions to the B2B cart[cite: 24, 61].
- [cite_start]Build responsive, mobile-first layouts using Tailwind CSS utility classes[cite: 21].

## 10. Directory & File Responsibility Architecture

Use this blueprint to understand where files must be created, their intended rendering strategy (Server Component vs. Client Component), and their specific architectural purpose.

```text
src/
├── app/
│   ├── (b2c)/                            # B2C Route Group (Retail Experience)
│   │   ├── layout.tsx                    # Light, airy header/footer layout
│   │   ├── page.tsx                      # Consumer homepage & featured products
│   │   ├── products/
│   │   │   ├── page.tsx                  # Retail product catalog with filters
│   │   │   └── [id]/page.tsx             # High-impact product detail page
│   │   ├── cart/page.tsx                 # Retail checkout bag
│   │   └── account/
│   │       └── orders/page.tsx           # B2C order history & tracking
│   │
│   ├── (b2b)/                            # B2B Route Group (Wholesale Experience)
│   │   ├── layout.tsx                    # Dense, corporate sidebar layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx                  # Wholesale portal overview & restock widgets
│   │   │   ├── quick-order/page.tsx      # Bulk matrix order grid & CSV upload
│   │   │   ├── analytics/page.tsx        # Credit health & category spend charts
│   │   │   └── orders/page.tsx           # PO ledger & downloadable invoices
│   │
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts   # Auth.js authentication endpoint
│   │
│   ├── layout.tsx                        # Global root layout (Fonts, Providers)
│   └── page.tsx                          # Base landing page / redirect handler
│
├── components/
│   ├── b2c/                              # Consumer-focused UI components
│   │   ├── b2c-header.tsx
│   │   ├── product-card.tsx
│   │   └── stripe-checkout-modal.tsx     # Mock Stripe modal
│   │
│   ├── b2b/                              # Corporate & bulk purchasing components
│   │   ├── b2b-sidebar.tsx
│   │   ├── matrix-order-grid.tsx         # SKU matrix input table
│   │   ├── po-checkout-form.tsx          # Net 30 trade credit form
│   │   ├── credit-health-card.tsx        # Credit line & Net 30 status
│   │   └── category-spend-chart.tsx      # Recharts spend trend component
│   │
│   ├── shared/                           # Reusable across B2C & B2B
│   │   ├── cart-sheet.tsx                # Slide-over cart drawer
│   │   ├── tier-price-badge.tsx          # Dynamic pricing display badge
│   │   └── user-role-switcher.tsx        # Header toggle to switch test profiles
│   │
│   └── ui/                               # Generated shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── table.tsx
│       └── ...
│
├── hooks/
│   ├── use-cart.ts                       # Zustand client store for shopping cart
│   └── use-user-role.ts                  # Helper hook for active user profile
│
├── lib/
│   ├── mock-db.ts                        # Local async mock database & latency helpers
│   ├── auth.ts                           # Auth.js configuration & credentials provider
│   └── utils.ts                          # shadcn utility helpers (cn)
│
└── middleware.ts                         # Role-based route protection & auto-redirects
```
