function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80" />
  );
}

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <LoadingCard />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <LoadingCard />
        <LoadingCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
