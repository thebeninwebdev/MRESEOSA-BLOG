export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Article Skeleton */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Image Skeleton */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse"></div>
        </div>

        {/* Article Header Skeleton */}
        <header className="mb-8">
          <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </header>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </article>
    </div>
  )
}
