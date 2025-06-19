import { bookmarks } from "@/data/bookmarks";
import { notFound } from "next/navigation";

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

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-100">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <span className="text-xs uppercase tracking-wider text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
          {bookmark.category}
        </span>

        <h1 className="text-3xl font-bold mt-4 mb-3 text-blue-400">
          {bookmark.title}
        </h1>

        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
          {bookmark.description}
        </p>

        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-lg transition-colors"
        >
          🔗 Visit Resource
        </a>
      </div>
    </div>
  );
}
