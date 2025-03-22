import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    console.log("🔍 API Hit: /api/student/profile");

    // ✅ Extract JWT Token
    const authHeader = req.headers.get("Authorization");
    console.log("🛠 Auth Header:", authHeader);
    
    if (!authHeader) {
      console.log("❌ No Authorization Header");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔑 Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("✅ Decoded Token:", decoded);

    // ✅ Parse JSON Request Body
    const requestBody = await req.json();
    console.log("📩 Received Body:", requestBody);

    const {
      yearOfStudy,
      degree,
      skills,
      tools,
      priorExperience,
      learningNewSkills,
      internshipType,
      committedHours,
      preferredIndustries,
      interestedRoles,
      workPreference,
      softSkill,
      softSkillDescription,
      location,
      startDate,
    } = requestBody;

    // ✅ Check required fields
    if (!yearOfStudy || !degree) {
      console.log("❌ Missing required fields");
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // ✅ Ensure `userId` from token is used
    console.log("🔄 Upserting Student Profile...");
    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId: decoded.id },
      update: {
        yearOfStudy,
        degree,
        skills,
        tools,
        priorExperience,
        learningNewSkills,
        internshipType,
        committedHours,
        preferredIndustries,
        interestedRoles,
        workPreference,
        softSkill,
        softSkillDescription,
        location,
        startDate,
      },
      create: {
        userId: decoded.id,
        yearOfStudy,
        degree,
        skills,
        tools,
        priorExperience,
        learningNewSkills,
        internshipType,
        committedHours,
        preferredIndustries,
        interestedRoles,
        workPreference,
        softSkill,
        softSkillDescription,
        location,
        startDate,
      },
    });

    console.log("✅ Profile saved successfully:", studentProfile);

    return NextResponse.json(
      { message: "Profile saved successfully", studentProfile },
      { status: 200 }
    );

  } catch (error) {
    console.error("🔥 Error saving profile:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error saving profile", error: errorMessage },
      { status: 500 }
    );
  }
}
