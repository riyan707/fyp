import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, location, startDate } = await req.json();

    if (!userId || !location || !startDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId },
      update: { location, startDate },
      create: { userId, location, startDate },
    });

    return NextResponse.json({ message: "Location and availability saved successfully", studentProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving location and availability", error }, { status: 500 });
  }
}
