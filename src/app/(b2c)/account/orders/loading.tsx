export default function OrdersLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-48 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[520px] animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-[520px] animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
