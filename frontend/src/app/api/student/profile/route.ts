import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // ✅ Extract JWT Token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const { yearOfStudy, degree } = await req.json();

    if (!yearOfStudy || !degree) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // ✅ Ensure `userId` from token is used
    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId: decoded.id },
      update: { yearOfStudy, degree },
      create: { userId: decoded.id, yearOfStudy, degree },
    });

    return NextResponse.json({ message: "Profile saved successfully", studentProfile }, { status: 200 });

  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ message: "Error saving profile", error }, { status: 500 });
  }
}
