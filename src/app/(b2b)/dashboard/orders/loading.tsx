function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80" />
  );
}

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      <LoadingCard />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
