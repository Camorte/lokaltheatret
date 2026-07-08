const DetailPageSkeleton = () => (
  <div className="flex flex-col" role="status" aria-label="Laster innhold">
    <div className="h-[300px] w-full animate-pulse bg-gray-200 md:h-[500px]" />
    <div className="page-container">
      <div className="mt-8 h-9 w-2/3 animate-pulse rounded bg-gray-200 md:h-12" />
      <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 flex flex-col gap-3">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
    <span className="sr-only">Laster …</span>
  </div>
);

export default DetailPageSkeleton;
