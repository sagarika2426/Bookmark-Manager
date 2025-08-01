import { notFound } from "next/navigation";
import Link from "next/link";
import { bookmarks } from "@/data/bookmarks";


export const generateMetadata = ({
  params,
}: {
  params: { slug: string; category: string };
}) => {
  const bookmark = bookmarks.find(
    (b) => b.slug === params.slug && b.category === params.category
  );
  return {
    title: bookmark?.title || "Bookmark Not Found",
    description: bookmark?.description || "Bookmark not found in our collection",
  };
};

export default function BookmarkPage({
  params,
}: {
  params: { slug: string; category: string };
}) {
  const bookmark = bookmarks.find(
    (b) => b.slug === params.slug && b.category === params.category
  );

  if (!bookmark) return notFound();

  // Get related bookmarks from the same category
  const relatedBookmarks = bookmarks
    .filter(b => b.category === bookmark.category && b.slug !== bookmark.slug)
    .slice(0, 3);


  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header with breadcrumb */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link 
              href={`/categories/${bookmark.category}`}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              {bookmark.category}
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300 font-medium">{bookmark.title}</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🔖</span>
            </div>
          
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Bookmark Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center text-xs uppercase font-semibold tracking-wider text-blue-300 bg-blue-600/20 px-3 py-1.5 rounded-full border border-blue-500/30">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  {bookmark.category}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent"></div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {bookmark.title}
              </h1>

              {/* Description */}
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {bookmark.description}
                </p>
              </div>

              {/* URL Info */}
              <div className="bg-gray-700/30 rounded-xl p-4 mb-8 border border-gray-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-sm">🌐</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                      Resource URL
                    </p>
                    <p className="text-gray-200 font-mono text-sm truncate">
                      {bookmark.url}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                >
                  <span>🚀</span>
                  Visit Resource
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <button className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium px-6 py-3 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500">
                  <span>📋</span>
                  Copy Link
                </button>

                <button className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium px-6 py-3 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500">
                  <span>⭐</span>
                  Favorite
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center mr-2 text-xs">⚡</span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 text-left p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200">
                  <span className="text-sm">📝</span>
                  <span className="text-sm font-medium">Edit Bookmark</span>
                </button>
                <button className="w-full flex items-center gap-3 text-left p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200">
                  <span className="text-sm">📤</span>
                  <span className="text-sm font-medium">Share</span>
                </button>
                <button className="w-full flex items-center gap-3 text-left p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200">
                  <span className="text-sm">🗑️</span>
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center mr-2 text-xs">📁</span>
                Category
              </h3>
              <div className="flex items-center gap-3">
                <Link
                  href={`/categories/${bookmark.category}`}
                  className="flex-1 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 hover:border-gray-500 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">#{bookmark.category}</p>
                      <p className="text-gray-400 text-xs">
                        {bookmarks.filter(b => b.category === bookmark.category).length} bookmarks
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* Related Bookmarks */}
            {relatedBookmarks.length > 0 && (
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center mr-2 text-xs">🔗</span>
                  Related
                </h3>
                <div className="space-y-3">
                  {relatedBookmarks.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/bookmarks/${related.category}/${related.slug}`}
                      className="block p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 group"
                    >
                      <h4 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {related.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}