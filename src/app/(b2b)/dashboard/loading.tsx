function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80" />
  );
}

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <LoadingCard />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <LoadingCard />
        <LoadingCard />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
