import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API Test Route is working!" }, { status: 200 });
}
