"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import axios from "axios";

export default function Step2({ onNext }: { onNext: (data: any) => void }) {
  const [skills, setSkills] = useState<string>("");
  const [tools, setTools] = useState<string>("");
  const [priorExperience, setPriorExperience] = useState<boolean | null>(null);
  const [learningNewSkills, setLearningNewSkills] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("📤 Submitting values:", { skills, tools, priorExperience, learningNewSkills });
  
    if (!skills.trim() || !tools.trim() || priorExperience === null || learningNewSkills === null) {
      alert("Please complete all fields properly.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in! Please sign in first.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/experience", // ✅ Correct API route
        {
          skills: skills.split(",").map((s) => s.trim()), // ✅ Convert to array
          tools: tools.split(",").map((t) => t.trim()),   // ✅ Convert to array
          priorExperience,
          learningNewSkills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("✅ Experience saved:", response.data);
        onNext({ skills, tools, priorExperience, learningNewSkills });
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("🔥 Error saving experience:", error.response?.data || error);
      alert(error.response?.data?.message || "Error saving experience");
    }
  };
  

  return (
    <div className="w-[500px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Skills & Experience</h2>

      <form onSubmit={handleSubmit}>
        {/* Skills */}
        <div className="mb-4">
          <Label htmlFor="topSkills" className="block mb-2">
            What are your top three skills?
          </Label>
          <Input
            id="topSkills"
            placeholder="e.g. Python, UX design, Marketing, Data Analysis"
            className="w-full"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Tools */}
        <div className="mb-4">
          <Label htmlFor="tools" className="block mb-2">
            What tools or software are you proficient in?
          </Label>
          <Input
            id="tools"
            placeholder="e.g. Figma, MATLAB, AutoCAD, Excel, Google Analytics"
            className="w-full"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
          />
        </div>

        {/* Prior Work Experience */}
        <div className="mb-4">
          <Label htmlFor="priorExperience" className="block mb-2">
            Do you have prior internship or work experience?
          </Label>
          <Select onValueChange={(value) => setPriorExperience(value === "yes")}>
            <SelectTrigger id="priorExperience" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Learning new skills */}
        <div className="mb-4">
          <Label htmlFor="newSkills" className="block mb-2">
            Are you open to learning new skills on the job?
          </Label>
          <Select onValueChange={(value) => setLearningNewSkills(value === "yes")}>
            <SelectTrigger id="newSkills" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Save & Continue
        </Button>
      </form>
    </div>
  );
}
