import { bookmarks } from "@/data/bookmarks";
import Link from "next/link";

export default function categoryPage({params}: {params: {category: string}}) {

    const filtered = bookmarks.filter((b) => b.category === params.category);
    return(
      <div className="p-6 max-w-5xl mx-auto text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-white capitalize">
        📁 {params.category} Bookmarks
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((bookmark) => (
          <Link
            key={bookmark.slug}
            href={`/bookmarks/${bookmark.category}/${bookmark.slug}`}
            className="group border border-gray-700 rounded-xl p-5 bg-gray-800 hover:bg-gray-700 hover:shadow-md transition duration-200"
          >
            <h2 className="text-xl font-semibold text-blue-400 group-hover:underline">
              {bookmark.title}
            </h2>

            <p className="text-gray-300 mt-2 text-sm">
              {bookmark.description}
            </p>

            <div className="mt-4">
              <span className="inline-block text-xs uppercase font-medium bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                {bookmark.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    )
}