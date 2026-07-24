function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80" />
  );
}

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <LoadingCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
