export default function RootLoading() {
  return (
    <div aria-label="Loading content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-3 w-32 animate-pulse bg-surface-muted" />
      <div className="mt-6 h-10 max-w-xl animate-pulse bg-surface-muted" />
      <div className="mt-4 h-5 max-w-2xl animate-pulse bg-surface-muted" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => <div className="h-48 animate-pulse border border-line bg-surface" key={item} />)}
      </div>
    </div>
  );
}
