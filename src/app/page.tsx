import Link from "next/link";
import { ArrowRight, Building2, PackageSearch, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-2xl shadow-slate-950/15 dark:border-slate-800">
          <CardHeader className="relative space-y-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_34%)]" />
            <div className="relative space-y-5">
              <Badge className="w-fit bg-white/10 text-white hover:bg-white/10">
                Apex Supply Network
              </Badge>
              <CardTitle className="max-w-3xl text-4xl tracking-tight sm:text-6xl">
                One storefront for retail discovery and wholesale procurement.
              </CardTitle>
              <CardDescription className="max-w-2xl text-slate-300">
                Access the B2C shopping flow, or sign in with a demo wholesale
                account to reach the B2B dashboard, analytics, and quick-order
                tools.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="relative flex flex-wrap gap-3 pt-0">
            <Link
              href="/products"
              className={buttonVariants({ variant: "default" })}
            >
              <PackageSearch className="size-4" />
              Enter retail catalog
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Wholesale login
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-4 text-sky-600" />
                Retail path
              </CardTitle>
              <CardDescription>
                Browse consumer-friendly product pages and checkout.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="size-4 text-emerald-600" />
                Wholesale path
              </CardTitle>
              <CardDescription>
                Sign in with the mock B2B account to reach dashboards and PO
                tools.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
            <CardHeader>
              <CardTitle className="text-base">Demo accounts</CardTitle>
              <CardDescription>
                Retail: retail-buyer@example.com | Wholesale:
                wholesale-partner@company.com
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
