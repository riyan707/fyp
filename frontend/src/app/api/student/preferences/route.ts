import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, internshipType, committedHours, preferredIndustries, interestedRoles } = await req.json();

    if (!userId || !internshipType || !committedHours || !preferredIndustries || !interestedRoles) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId },
      update: { internshipType, committedHours, preferredIndustries, interestedRoles },
      create: { userId, internshipType, committedHours, preferredIndustries, interestedRoles },
    });

    return NextResponse.json({ message: "Job preferences saved successfully", studentProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving job preferences", error }, { status: 500 });
  }
}
