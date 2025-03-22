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

// Add Student Experience Route
app.post("/api/student/experience", authenticateUser, async (req, res) => {
  try {
    const { skills, tools, priorExperience, learningNewSkills } = req.body;

    if (!skills || !tools || priorExperience === null || learningNewSkills === null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update Student Profile
    const studentProfile = await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: { skills, tools, priorExperience, learningNewSkills },
    });

    res.status(200).json({
      message: "Experience saved successfully",
      studentProfile,
    });
  } catch (error) {
    console.error("🔥 Student Experience Error:", error);
    res.status(500).json({ message: "Error saving experience", error: error.message });
  }
});

// Add Student Location & Availability Route
app.post("/api/student/location", authenticateUser, async (req, res) => {
  try {
    const { location, startDate } = req.body;

    if (!location || !startDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update Student Profile with location & availability
    const studentProfile = await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: {
        location,
        startDate,
      },
    });

    res.status(200).json({
      message: "Location & availability saved successfully",
      studentProfile,
    });
  } catch (error) {
    console.error("🔥 Student Location Error:", error);
    res.status(500).json({ message: "Error saving location & availability", error: error.message });
  }
});


// Add Student Personality Route
app.post("/api/student/personality", authenticateUser, async (req, res) => {
  try {
    const { workPreference, softSkill, softSkillDescription } = req.body;

    if (!workPreference || !softSkill || !softSkillDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update Student Profile
    const studentProfile = await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: {
        workPreference,
        softSkill,
        softSkillDescription,
      },
    });

    res.status(200).json({
      message: "Work style & personality saved successfully",
      studentProfile,
    });
  } catch (error) {
    console.error("🔥 Student Personality Error:", error);
    res.status(500).json({ message: "Error saving work style & personality", error: error.message });
  }
});


// Add Student Preferences Route
app.post("/api/student/preferences", authenticateUser, async (req, res) => {
  try {
    const { internshipType, committedHours, preferredIndustries, interestedRoles } = req.body;

    if (!internshipType || !committedHours || !preferredIndustries || !interestedRoles) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update Student Profile
    const studentProfile = await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: {
        internshipType,
        committedHours,
        preferredIndustries,
        interestedRoles,
      },
    });

    res.status(200).json({
      message: "Job preferences saved successfully",
      studentProfile,
    });
  } catch (error) {
    console.error("🔥 Student Preferences Error:", error);
    res.status(500).json({ message: "Error saving job preferences", error: error.message });
  }
});


// Add Student Profile Route
app.post("/api/student/profile", authenticateUser, async (req, res) => {
  try {
    const { yearOfStudy, degree } = req.body;

    if (!yearOfStudy || !degree) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure `userId` from token is used
    const studentProfile = await prisma.studentProfile.upsert({
      where: { userId: req.user.id }, // req.user is set by `authenticateUser`
      update: { yearOfStudy, degree },
      create: { userId: req.user.id, yearOfStudy, degree },
    });

    res.status(200).json({
      message: "Profile saved successfully",
      studentProfile,
    });
  } catch (error) {
    console.error("🔥 Student Profile Error:", error);
    res.status(500).json({ message: "Error saving profile", error: error.message });
  }
});

// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["STUDENT", "STARTUP"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Generate JWT Token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
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

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate Token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected Route (User Profile)
app.get("/api/user/profile", authenticateUser, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { name: true, email: true, role: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
