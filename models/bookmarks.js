// models/bookmarks.js
import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
});

const Bookmarks = mongoose.models.Bookmarks || mongoose.model('Bookmarks', BookmarkSchema);

export default Bookmarks;
