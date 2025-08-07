import { useState, useEffect } from "react";

type Bookmark = {
  title: string;
  url: string;
  slug: string;
  category: string;
  description?: string;
  customCategory?: string;
};

type EditBookmarkFormProps = {
  isOpen: boolean;
  onClose: () => void;
  bookmark: Bookmark;
  onUpdate: (bookmark: Bookmark) => void;
};

export default function EditBookmarkForm({
  isOpen,
  onClose,
  bookmark,
  onUpdate,
}: EditBookmarkFormProps) {
  const [formData, setFormData] = useState<Bookmark>(bookmark);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(bookmark);
  }, [bookmark]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/bookmark/${bookmark.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update bookmark");
      if (res.ok) alert("Bookmark updated!");

      onUpdate(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl border border-gray-700/50 backdrop-blur-sm shadow-lg p-6 w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Bookmark</h2>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full bg-gray-400/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
              required
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL *</label>
            <input
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
              required
            >
              <option value="">Select category</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
              <option value="tools">Tools</option>
              <option value="interviews">Interviews</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.category === "other" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Custom Category *
              </label>
              <input
                name="customCategory"
                value={formData.customCategory || ""}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700/50 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg border border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>Update Bookmark</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
