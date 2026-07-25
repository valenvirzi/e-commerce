function LoadingCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80" />
  );
}

export default function B2BLoading() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-200/80 bg-white/85 px-4 py-6 dark:border-slate-800 dark:bg-slate-950/80">
        <LoadingCard />
      </aside>
      <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <LoadingCard />
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <LoadingCard />
          <LoadingCard />
        </div>
      </main>
    </div>
  );
}
