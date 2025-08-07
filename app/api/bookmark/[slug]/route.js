import { NextResponse } from "next/server";
import connectToDB from "../../../../lib/mongoose";
import Bookmarks from "../../../../models/bookmarks";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const deleted = await Bookmarks.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Bookmark deleted", data: deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
}


export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const bookmark = await Bookmarks.findOne({ slug });

    if (!bookmark) {
      return NextResponse.json(
        { success: false, error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bookmark }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookmark" },
      { status: 500 }
    );
  }
}



export async function PUT(req, { params }) {
  try {
    await connectToDB(); 

    const { slug } = params; 

    const body = await req.json(); 

    const updatedBookmark = await Bookmarks.findOneAndUpdate(  
      { slug },
      { $set: body },
      { new: true }
    );

    if (!updatedBookmark) { 
      return NextResponse.json(
        { success: false, error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(  
      { success: true, message: "Bookmark updated", data: updatedBookmark },
      { status: 200 }
    );
  } catch (error) {  
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update bookmark" },
      { status: 500 }
    );
  }
}

