import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, workPreference, softSkill, softSkillDescription } = await req.json();

    if (!userId || !workPreference || !softSkill || !softSkillDescription) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId },
      update: { workPreference, softSkill, softSkillDescription },
      create: { userId, workPreference, softSkill, softSkillDescription },
    });

    return NextResponse.json({ message: "Work style and personality saved successfully", studentProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving work style and personality", error }, { status: 500 });
  }
}
