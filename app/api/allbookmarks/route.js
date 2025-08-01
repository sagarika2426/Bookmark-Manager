import { NextResponse } from "next/server";
import connectToDB from "../../../lib/mongoose";
import Bookmarks from "../../../models/bookmarks";

export async function GET() {
  try {
    await connectToDB();

    const bookmarks = await Bookmarks.find();
    return NextResponse.json({ success: true, data: bookmarks });
    // return NextResponse.json({ message: "hello" });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch invoices' }, { status: 500 });
  }
}


