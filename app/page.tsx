"use client";
import { useBookmarks } from "@/hooks/useBookmarks";
import Link from "next/link";


export default function Home() {
 const { bookmarks, categories } = useBookmarks();

  const bookmarkCount = bookmarks.length;


  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Section */}
   <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <div className="max-w-4xl mx-auto px-6 py-10">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 rotate-3 shadow-xl">
        <span className="text-3xl">📚</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        BookmarkHub
      </h1>
      <p className="text-md md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Your personal digital library with <span className="font-semibold text-white">{bookmarkCount}</span> carefully curated bookmarks.
      </p>
    </div>

    {/* Stats Section */}
    <div className="text-center mb-6">
      <h2 className="text-gray-400 text-md uppercase tracking-wider mb-6">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl text-blue-400">🔖</span>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-white">{bookmarkCount}</p>
              <p className="text-sm text-gray-400">Total Bookmarks</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <span className="text-xl text-purple-400">📁</span>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-white">{categories.length}</p>
              <p className="text-sm text-gray-400">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center">
      <Link
        href="/create"
        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
      >
        <span className="text-xl">➕</span> Add New Bookmark
      </Link>
    </div>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 text-sm">📂</span>
            Browse Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 text-sm font-medium tracking-wide hover:from-blue-600 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-lg border border-gray-600/50 hover:border-blue-400/50 hover:shadow-blue-500/20 hover:scale-105"
              >
                <span className="relative z-10">#{category}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bookmarks Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm">🌟</span>
            All Bookmarks
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark, index) => (
              <Link
                key={bookmark.slug}
                href={`/bookmarks/${bookmark.category}/${bookmark.slug}`}
                className="group relative overflow-hidden border border-gray-700/50 rounded-2xl p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm hover:from-gray-700/80 hover:to-gray-800/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                      {bookmark.title}
                    </h3>
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-2 ml-2"></div>
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
        </div>
      </div>
    </div>
  );
}