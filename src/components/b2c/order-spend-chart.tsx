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

type SpendPoint = {
  month: string;
  spend: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function OrderSpendChart({ data }: { data: SpendPoint[] }) {
  return (
    <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
      <CardHeader>
        <CardTitle>Monthly spend</CardTitle>
        <CardDescription>
          Consumer purchasing pattern over time.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="spendGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.02} />
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
              width={40}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value ?? 0))}
            />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#0284c7"
              fill="url(#spendGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
