// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // STEP 1: Create Student Profiles (individually to support arrays)
  const studentData = [
    {
      userId: "49e50041-2183-4e64-bad5-2496f29b8b0c",
      yearOfStudy: 3,
      degree: "Computer Science",
      skills: ["JavaScript", "Node.js", "APIs"],
      tools: ["VSCode", "Git"],
      preferredIndustries: ["Computer Science"],
      interestedRoles: ["Software Engineer"],
      committedHours: "16 Hours - 32 Hours",
      internshipType: "Long Term",
      workPreference: "Remote",
      location: "London",
      startDate: new Date("2025-04-11"),
    },
    {
      userId: "05d9ae86-1c1c-4359-9cde-f8dae73a5d08",
      yearOfStudy: 2,
      degree: "Digital Design",
      skills: ["Figma", "Prototyping"],
      tools: ["Figma", "Adobe XD"],
      preferredIndustries: ["Design"],
      interestedRoles: ["UI/UX Designer"],
      committedHours: "Less than 16 Hours",
      internshipType: "Short Term",
      workPreference: "Hybrid",
      location: "London",
      startDate: new Date("2025-04-13"),
    },
    {
      userId: "c514f05c-f426-4fb7-9aff-88bfb4ef86f1",
      yearOfStudy: 1,
      degree: "Marketing",
      skills: ["SEO", "Copywriting"],
      tools: ["Canva", "Google Analytics"],
      preferredIndustries: ["Marketing"],
      interestedRoles: ["Digital Marketer"],
      committedHours: "More than 32 Hours",
      internshipType: "Long Term",
      workPreference: "Remote",
      location: "Remote",
      startDate: new Date("2025-04-10"),
    },
    {
      userId: "9a9b7d78-0ab7-4ad5-b94a-62506e645cbc",
      yearOfStudy: 4,
      degree: "Biomedical Engineering",
      skills: ["Lab Work", "Python", "Data Analysis"],
      tools: ["Jupyter", "MATLAB"],
      preferredIndustries: ["Biomedical"],
      interestedRoles: ["Researcher"],
      committedHours: "16 Hours - 32 Hours",
      internshipType: "Long Term",
      workPreference: "In-Person",
      location: "Oxford",
      startDate: new Date("2025-04-10"),
    },
    {
      userId: "00852cac-8727-46b9-b5f4-5f4dd1df7bb1",
      yearOfStudy: 3,
      degree: "Civil Engineering",
      skills: ["AutoCAD", "Structural Design"],
      tools: ["AutoCAD", "SketchUp"],
      preferredIndustries: ["Engineering"],
      interestedRoles: ["Site Engineer"],
      committedHours: "16 Hours - 32 Hours",
      internshipType: "Long Term",
      workPreference: "In-Person",
      location: "Manchester",
      startDate: new Date("2025-04-09"),
    },
  ];

  for (const student of studentData) {
    await prisma.student.upsert({
      where: { userId: student.userId },
      update: student,
      create: student,
    });
  }

  // STEP 2: Create Startup Profiles
  const startupData = [
    {
      userId: "82367b6c-ce3d-4178-b5b1-66d56db46857",
      companyName: "TechVerse",
      website: "https://techverse.io",
      foundedYear: 2019,
    },
    {
      userId: "90b4a885-600d-4bb8-9934-08b7a9392349",
      companyName: "PixelForge",
      website: "https://pixelforge.com",
      foundedYear: 2021,
    },
    {
      userId: "654f6366-48a1-4d6a-852b-2b1aea1557c2",
      companyName: "MarketNest",
      website: "https://marketnest.com",
      foundedYear: 2018,
    },
    {
      userId: "37128854-13e0-43c4-80a2-4947dd917cef",
      companyName: "BioLogix",
      website: "https://biologixlabs.com",
      foundedYear: 2015,
    },
    {
      userId: "b7b2491a-5ca9-4e5b-b19b-b301a3062c13",
      companyName: "BuildWise",
      website: "https://buildwiseinfra.com",
      foundedYear: 2020,
    },
  ];

  for (const startup of startupData) {
    await prisma.startup.upsert({
      where: { userId: startup.userId },
      update: startup,
      create: startup,
    });
  }

  // STEP 3: Create Internships
  const internships = [
    {
      title: "Software Engineer Intern",
      description: "Assist with backend development and system design.",
      internshipType: "Internship",
      duration: "3 months",
      workPreference: "Remote",
      skillsRequired: "JavaScript, Node.js, APIs",
      preferredIndustry: "Computer Science",
      location: "Remote",
      startDate: new Date("2025-04-15"),
      salary: "£1,200/month",
      company: "TechVerse",
      startupId: "82367b6c-ce3d-4178-b5b1-66d56db46857",
    },
    {
      title: "UI/UX Designer Intern",
      description: "Design interfaces and improve user experience.",
      internshipType: "Internship",
      duration: "2 months",
      workPreference: "Hybrid",
      skillsRequired: "Figma, Design Thinking, Wireframing",
      preferredIndustry: "Design",
      location: "London",
      startDate: new Date("2025-04-20"),
      salary: "£1,000/month",
      company: "PixelForge",
      startupId: "90b4a885-600d-4bb8-9934-08b7a9392349",
    },
    {
      title: "Digital Marketing Intern",
      description: "Work on email campaigns and social media.",
      internshipType: "Internship",
      duration: "4 months",
      workPreference: "Remote",
      skillsRequired: "SEO, Content Writing, Google Analytics",
      preferredIndustry: "Marketing",
      location: "Remote",
      startDate: new Date("2025-04-12"),
      salary: "£1,000/month",
      company: "MarketNest",
      startupId: "654f6366-48a1-4d6a-852b-2b1aea1557c2",
    },
    {
      title: "Biomedical Research Intern",
      description: "Join R&D team on product trials.",
      internshipType: "Internship",
      duration: "6 months",
      workPreference: "In-Person",
      skillsRequired: "Data Analysis, Lab Work, Python",
      preferredIndustry: "Biomedical",
      location: "Oxford",
      startDate: new Date("2025-04-18"),
      salary: "£1,500/month",
      company: "BioLogix",
      startupId: "37128854-13e0-43c4-80a2-4947dd917cef",
    },
    {
      title: "Civil Engineering Intern",
      description: "Assist on planning and structural analysis.",
      internshipType: "Internship",
      duration: "5 months",
      workPreference: "In-Person",
      skillsRequired: "AutoCAD, Structural Design, Report Writing",
      preferredIndustry: "Engineering",
      location: "Manchester",
      startDate: new Date("2025-04-14"),
      salary: "£1,300/month",
      company: "BuildWise",
      startupId: "b7b2491a-5ca9-4e5b-b19b-b301a3062c13",
    },
  ];

  await prisma.internship.createMany({ data: internships, skipDuplicates: true });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error("🔥 Seed Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
