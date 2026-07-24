"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CategorySpendPoint = {
  month: string;
  officeSupplies: number;
  industrialGear: number;
  personalCare: number;
  total: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function CategorySpendChart({ data }: { data: CategorySpendPoint[] }) {
  return (
    <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
      <CardHeader>
        <CardTitle>Monthly category spend</CardTitle>
        <CardDescription>
          Stacked trends across office, industrial, and personal care
          procurement.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="officeGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient
                id="industrialGradient"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="personalGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={42}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) =>
                formatCurrency(
                  Number(Array.isArray(value) ? value[0] : (value ?? 0)),
                )
              }
              labelStyle={{ color: "#0f172a" }}
            />
            <Area
              type="monotone"
              dataKey="officeSupplies"
              stroke="#0f766e"
              fill="url(#officeGradient)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="industrialGear"
              stroke="#2563eb"
              fill="url(#industrialGradient)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="personalCare"
              stroke="#f97316"
              fill="url(#personalGradient)"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
