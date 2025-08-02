"use client";
import Link from "next/link";
// import { bookmarks } from "@/data/bookmarks";
import { useEffect, useState } from "react";
import CreateBookmarkModal from "./create/page";

// export const metadata = {
//   title: "BookmarkHub - Your Digital Library",
//   description: "Organize and access your favorite bookmarks with ease",
// };


export default function Home() {
    const [bookmarks, setBookmarks] = useState([]);
      const [loading, setLoading] = useState(true);
          const [isOpen, setIsOpen] = useState(false);
            const [categories, setCategories] = useState([]);




  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const res = await fetch("/api/allbookmarks");
        const data = await res.json();
        if (data.success) {
          setBookmarks(data.data);
          const uniqueCategories = Array.from(
            new Set(data.data.map((b) => b.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      }
    }

    fetchBookmarks();
  }, []);

  const bookmarkCount = bookmarks.length;
  
  const openModal = () => setIsOpen(true);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 rotate-3 shadow-lg">
              <span className="text-2xl">📚</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BookmarkHub
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your personal digital library with {bookmarkCount} carefully curated bookmarks
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-400 text-lg">🔖</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{bookmarkCount}</p>
                  <p className="text-gray-400 text-sm">Total Bookmarks</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-purple-400 text-lg">📁</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{categories.length}</p>
                  <p className="text-gray-400 text-sm">Categories</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-green-400 text-lg">⚡</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Fast</p>
                  <p className="text-gray-400 text-sm">Quick Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-8">
  <button  onClick={openModal} 
     // make sure this function opens your bookmark creation modal
    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
  >
    <span className="text-lg">➕</span> Add New Bookmark
  </button>
</div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Categories Section */}
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

        {/* Footer CTA */}
        {/* <div className="text-center py-12">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
            <h3 className="text-xl font-semibold text-white mb-3">Ready to organize your bookmarks?</h3>
            <p className="text-gray-300 mb-6">Start exploring your curated collection of resources</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Add New Bookmark
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-colors duration-200 border border-gray-600 hover:border-gray-500">
                Import Bookmarks
              </button>
            </div>
          </div>
        </div> */}
      </div>
       <CreateBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}