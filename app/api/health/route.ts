import { NextResponse } from "next/server";
import { dbConnect } from "@/config/db";

export async function GET() {
  try {
    /* call or caching database connection */
    await dbConnect();

    return NextResponse.json(
      {
        success: true,
        message: 'Server connected successfully.',
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch the resource."
      },
      { status: 500 }
    );
  }
}