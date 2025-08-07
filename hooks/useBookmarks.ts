"use client";
import { useEffect, useState } from "react";

export type Bookmark = {
  title: string;
  description: string;
  category: string;
  slug: string;
};

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const res = await fetch("/api/allbookmarks");
        const data = await res.json();

        if (data.success) {
          setBookmarks(data.data);
          const uniqueCategories = Array.from(
            new Set((data.data as { category: string }[]).map((b) => b.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, []);

  return { bookmarks, categories, loading };
}
