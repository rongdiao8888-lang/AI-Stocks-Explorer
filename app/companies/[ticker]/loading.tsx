export default function CompanyLoading() {
  return (
    <div aria-label="Loading company research" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-3 w-28 animate-pulse bg-surface-muted" />
      <div className="mt-5 h-10 w-64 animate-pulse bg-surface-muted" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {[0, 1, 2].map((item) => <div className="h-48 animate-pulse border border-line bg-surface" key={item} />)}
      </div>
    </div>
  );
}
