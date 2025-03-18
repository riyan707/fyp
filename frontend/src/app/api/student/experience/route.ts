import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, skills, tools, priorExperience, learningNewSkills } = await req.json();

    if (!userId || !skills || !tools || priorExperience === undefined || learningNewSkills === undefined) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId },
      update: { skills, tools, priorExperience, learningNewSkills },
      create: { userId, skills, tools, priorExperience, learningNewSkills },
    });

    return NextResponse.json({ message: "Experience saved successfully", studentProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving experience", error }, { status: 500 });
  }
}
