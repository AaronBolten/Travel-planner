export function DestinationCardSkeleton() {
  return (
    <div className="rounded-xl border animate-pulse overflow-hidden">
      <div className="h-44 w-full bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function DetailsPageSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6 animate-pulse">
      <div className="md:col-span-2 space-y-4">
        <div className="h-64 w-full bg-gray-200 rounded-xl" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="mt-6 space-y-2">
          <div className="h-5 w-56 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="border rounded-xl p-4 space-y-3">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
