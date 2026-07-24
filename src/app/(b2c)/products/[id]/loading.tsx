export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="h-[620px] animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-6">
          <div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-56 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-32 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
