"use client";
import { useBookmarks } from "@/hooks/useBookmarks";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { category } = useParams();
  const { bookmarks, loading } = useBookmarks();

  if (loading) return <p>Loading...</p>;

  const filtered = bookmarks.filter((b) => b.category === category);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300 font-medium">Categories</span>
            <span className="text-gray-500">/</span>
            <span className="text-white font-semibold capitalize">{category}</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <span className="text-2xl">📁</span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-white capitalize mb-2">
                {category} Collection
              </h1>
              <p className="text-gray-300 text-lg">
                {filtered.length} carefully curated bookmark{filtered.length !== 1 ? 's' : ''} in this category
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((bookmark, index) => (
                <Link
                  key={bookmark.slug}
                  href={`/bookmarks/${bookmark.category}/${bookmark.slug}`}
                  className="group relative overflow-hidden border border-gray-700/50 rounded-2xl p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm hover:from-gray-700/80 hover:to-gray-800/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 flex-1">
                        {bookmark.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 group-hover:text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                      {bookmark.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center text-xs uppercase font-medium bg-gray-700/50 group-hover:bg-gray-600/50 text-gray-300 group-hover:text-gray-200 px-3 py-1.5 rounded-full border border-gray-600/30 group-hover:border-gray-500/30 transition-all duration-200">
                        <span className="w-1.5 h-1.5 bg-current rounded-full mr-2 opacity-60"></span>
                        {bookmark.category}
                      </span>
                      <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State (if no bookmarks) */}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📭</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No bookmarks found</h3>
                <p className="text-gray-400 mb-6">This category doesn&apos;t have any bookmarks yet.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  <span>🏠</span>
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}