import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateUser } from "./middleware/authMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

// Middleware
app.use(cors());
app.use(express.json());

/* =====================
 ✅ GET USER PROFILE ROUTE (Refined)
===================== */
app.get("/api/user/profile", authenticateUser, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, name: true }, // 👈 FIXED
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    let profileData = null;

    if (user.role === "STUDENT") {
      profileData = await prisma.student.findUnique({ where: { userId: user.id } });
    } else if (user.role === "STARTUP") {
      profileData = await prisma.startup.findUnique({ where: { userId: user.id } });
    }

    res.json({ ...user, profile: profileData }); // ✅ Includes "name"
  } catch (error) {
    console.error("🔥 Fetch Profile Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* =====================
 ✅ STUDENT PROFILE UPDATE ROUTE
===================== */
app.post("/api/student/profile", authenticateUser, async (req, res) => {
  try {
    const { yearOfStudy, degree } = req.body;

    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can update their profile." });
    }

    const updatedProfile = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        yearOfStudy: yearOfStudy || 1,
        degree: degree || "Undeclared",
      },
    });

    res.status(200).json({ message: "Student profile updated", profile: updatedProfile });
  } catch (error) {
    console.error("🔥 Error updating student profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

/* =====================
 ✅ STUDENT EXPERIENCE UPDATE ROUTE
===================== */
app.post("/api/student/experience", authenticateUser, async (req, res) => {
  try {
    const { skills, tools, priorExperience, learningNewSkills } = req.body;

    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can update experience" });
    }

    const updated = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        skills,
        tools,
        priorExperience,
        learningNewSkills,
      },
    });

    res.status(200).json({ message: "Experience saved", profile: updated });
  } catch (error) {
    console.error("🔥 Experience Save Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


/* =====================
 ✅ STUDENT PREFERENCES UPDATE ROUTE
===================== */
app.post("/api/student/preferences", authenticateUser, async (req, res) => {
  try {
    const { internshipType, committedHours, preferredIndustries, interestedRoles } = req.body;

    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can update preferences" });
    }

    const updated = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        internshipType,
        committedHours,
        preferredIndustries,
        interestedRoles,
      },
    });

    res.status(200).json({ message: "Preferences saved", profile: updated });
  } catch (error) {
    console.error("🔥 Preferences Save Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


/* =====================
 ✅ STUDENT PERSONALITY UPDATE ROUTE
===================== */
app.post("/api/student/personality", authenticateUser, async (req, res) => {
  try {
    const { workPreference, softSkill, softSkillDescription } = req.body;

    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can update personality traits" });
    }

    const updated = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        workPreference,
        softSkill,
        softSkillDescription,
      },
    });

    res.status(200).json({ message: "Personality saved", profile: updated });
  } catch (error) {
    console.error("🔥 Personality Save Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

/* =====================
 ✅ STUDENT LOCATION UPDATE ROUTE
===================== */
app.post("/api/student/location", authenticateUser, async (req, res) => {
  try {
    const { location, startDate } = req.body;

    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can update location" });
    }

    const updated = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        location,
        startDate: new Date(startDate),
      },
    });

    res.status(200).json({ message: "Location saved", profile: updated });
  } catch (error) {
    console.error("🔥 Location Save Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

/* =====================
 ✅ STUDENT EDIT PROFILE ROUTE
===================== */
app.put("/api/student/edit", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can edit this profile." });
    }

    const {
      name,
      yearOfStudy,
      degree,
      skills,
      tools,
      preferredIndustries,
      interestedRoles,
      committedHours,
      internshipType,
      workPreference,
      softSkill,
      softSkillDescription,
      location,
    } = req.body;

    // ✅ Update student's additional profile data
    const updatedStudent = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        yearOfStudy,
        degree,
        skills,
        tools,
        preferredIndustries,
        interestedRoles,
        committedHours,
        internshipType,
        workPreference,
        softSkill,
        softSkillDescription,
        location,
      },
    });

    // ✅ Also update student's name in User table
    await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
    });

    res.status(200).json({ message: "Student profile updated successfully", profile: updatedStudent });
  } catch (error) {
    console.error("🔥 Edit Student Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



/* =====================
 ✅ STARTUP EDIT PROFILE ROUTE
===================== */
app.put("/api/startup/edit", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "STARTUP") {
      return res.status(403).json({ message: "Only startups can edit this profile." });
    }

    const { companyName, website, foundedYear } = req.body;

    const updatedStartup = await prisma.startup.update({
      where: { userId: req.user.id },
      data: {
        companyName,
        website,
        foundedYear: parseInt(foundedYear),
      },
    });

    res.status(200).json({ message: "Startup profile updated successfully", profile: updatedStartup });
  } catch (error) {
    console.error("🔥 Edit Startup Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


/* =====================
 ✅ INTERNSHIP POSTING ROUTE (Only for Startups)
===================== */
app.post("/api/internships", authenticateUser, async (req, res) => {
  try {
    const {
      title,
      description,
      internshipType,
      duration,
      workPreference,
      skillsRequired,
      preferredIndustry,
      location,
      startDate,
      salary,        // ✅ NEW FIELD
      company        // ✅ NEW FIELD
    } = req.body;

    // Validate input
    if (
      !title || !description || !internshipType || !duration ||
      !workPreference || !skillsRequired || !preferredIndustry ||
      !location || !startDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure user is a startup
    if (req.user.role !== "STARTUP") {
      return res.status(403).json({ message: "Only startups can post internships" });
    }

    // Fetch startup profile linked to user
    const startupProfile = await prisma.startup.findUnique({
      where: { userId: req.user.id },
    });

    if (!startupProfile) {
      return res.status(404).json({ message: "Startup profile not found. Ensure your account is set up correctly." });
    }

    // Create internship under startup
    const newInternship = await prisma.internship.create({
      data: {
        title,
        description,
        internshipType,
        duration,
        workPreference,
        skillsRequired,
        preferredIndustry,
        location,
        startDate: new Date(startDate),
        salary,      // ✅ NEW FIELD
        company,     // ✅ NEW FIELD
        startupId: startupProfile.id,
      },
    });

    res.status(201).json({
      message: "Internship posted successfully",
      internship: newInternship,
    });
  } catch (error) {
    console.error("🔥 Internship Creation Error:", error);
    res.status(500).json({ message: "Error posting internship", error: error.message });
  }
});


/* =====================
 ✅ USER SIGNUP ROUTE (Students & Startups)
===================== */
app.post("/api/auth/signup", async (req, res) => {
  const { email, password, role, name, companyName, website, foundedYear, yearOfStudy, degree } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required." });
  }

  if (!["STUDENT", "STARTUP"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  if (role === "STUDENT" && !name) {
    return res.status(400).json({ message: "Name is required for students." });
  }

  if (role === "STARTUP" && !companyName) {
    return res.status(400).json({ message: "Company name is required for startups." });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        name: role === "STUDENT" ? name : null, // ✅ Store name for students
      },
    });

    if (role === "STUDENT") {
      await prisma.student.create({
        data: {
          userId: newUser.id,
          yearOfStudy: yearOfStudy || 1,
          degree: degree || "Undeclared",
        },
      });
    }

    if (role === "STARTUP") {
      await prisma.startup.create({
        data: {
          userId: newUser.id,
          companyName,
          website: website || null,
          foundedYear: foundedYear || new Date().getFullYear(),
        },
      });
    }

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User registered successfully", token, role: newUser.role });
  } catch (error) {
    console.error("🔥 Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* =====================
 ✅ LOGIN ROUTE
===================== */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "7d" });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/* =====================
 ✅ STUDENT MATCHING ROUTE
===================== */
app.get("/api/match", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can get matches." });
    }

    // 1. Fetch student profile
    const student = await prisma.student.findUnique({ where: { userId: req.user.id } });
    console.log("🎓 Student Profile:", student);

    if (!student) return res.status(404).json({ message: "Student profile not found." });

    // 2. Fetch all internships
    const internships = await prisma.internship.findMany({
      include: { startup: true },
    });

    console.log("📦 Internships found:", internships.length);

    const matchedInternships = [];

    for (const internship of internships) {
      // 3. Filter by startDate first
      const studentAvailable = new Date(student.startDate);
      const internshipStart = new Date(internship.startDate);
      if (studentAvailable > internshipStart) continue;

      // 4. Score calculation
      let score = 0;

      // 30% Skills
      const studentSkills = new Set(student.skills.map(s => s.toLowerCase()));
      const internshipSkills = internship.skillsRequired
        .split(",")
        .map(s => s.trim().toLowerCase());
      const skillMatches = internshipSkills.filter(s => studentSkills.has(s)).length;
      score += (skillMatches / internshipSkills.length) * 30;

      // 25% Tools
      const studentTools = new Set(student.tools.map(t => t.toLowerCase()));
      const internshipTools = internship.toolsRequired
        ? internship.toolsRequired.split(",").map(t => t.trim().toLowerCase())
        : [];
      const toolMatches = internshipTools.filter(t => studentTools.has(t)).length;
      if (internshipTools.length > 0) {
        score += (toolMatches / internshipTools.length) * 25;
      }

      // 20% Industry
      const industryMatch = student.preferredIndustries
        .map(i => i.toLowerCase())
        .includes(internship.preferredIndustry.toLowerCase());
      if (industryMatch) score += 20;

      // 15% Work Preference
      if (
        student.workPreference.toLowerCase() === internship.workPreference.toLowerCase()
      ) {
        score += 15;
      }

      // Log score for debug
      console.log(`⚖️ Score for ${internship.title}:`, score.toFixed(2));

      matchedInternships.push({ ...internship, score });
    }

    // 5. Sort and return top 3
    matchedInternships.sort((a, b) => b.score - a.score);
    res.status(200).json(matchedInternships.slice(0, 3));
  } catch (error) {
    console.error("🔥 Match Error:", error);
    res.status(500).json({ message: "Error finding matches", error: error.message });
  }
});



/* =====================
 ✅ GET ALL INTERNSHIPS ROUTE
===================== */
app.get("/api/internships", async (req, res) => {
  try {
    const internships = await prisma.internship.findMany({
      include: {
        startup: {
          select: { companyName: true },
        },
      },
    });

    res.status(200).json(internships);
  } catch (error) {
    console.error("🔥 Fetch Internships Error:", error);
    res.status(500).json({ message: "Error fetching internships", error: error.message });
  }
});

/* =====================
 ✅ SERVER LISTENER
===================== */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
