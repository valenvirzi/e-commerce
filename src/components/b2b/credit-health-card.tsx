import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type CreditHealthCardProps = {
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  upcomingDueAmount: number;
  nextDueDate: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function CreditHealthCard({
  creditLimit,
  currentBalance,
  availableCredit,
  upcomingDueAmount,
  nextDueDate,
}: CreditHealthCardProps) {
  const utilization = Math.min(
    100,
    Math.round((currentBalance / creditLimit) * 100),
  );

  return (
    <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
      <CardHeader>
        <CardTitle>Credit health</CardTitle>
        <CardDescription>
          Trade credit, utilization, and upcoming invoice exposure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-100"
          >
            Net 30 active
          </Badge>
          <Badge variant="outline">
            Due{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(new Date(nextDueDate))}
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Available credit
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {formatCurrency(availableCredit)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current balance
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {formatCurrency(currentBalance)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Upcoming due
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {formatCurrency(upcomingDueAmount)}
            </p>
          </div>
        </div>

        <div className="space-y-2 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/80">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              Utilization
            </span>
            <span className="font-medium">
              {utilization}% of {formatCurrency(creditLimit)}
            </span>
          </div>
          <Progress value={utilization} className="gap-2" />
        </div>
      </CardContent>
    </Card>
  );
}
