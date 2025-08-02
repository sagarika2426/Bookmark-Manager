import { NextResponse } from "next/server";
import connectToDB from "../../../lib/mongoose";
import Bookmarks from "../../../models/bookmarks";
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const { title, slug, category, url, description } = body;

    // Validate required fields
    if (!title || !slug || !category || !url) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await Bookmarks.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Slug must be unique" },
        { status: 409 }
      );
    }

    const newBookmark = await Bookmarks.create({
      title,
      slug,
      category,
      url,
      description,
    });

    return NextResponse.json({ success: true, data: newBookmark }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add bookmark" },
      { status: 500 }
    );
  }
}