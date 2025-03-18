"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import axios from "axios";

export default function Step2({ onNext, userId }: { onNext: (data: any) => void; userId: string }) {
  const [skills, setSkills] = useState<string>("");
  const [tools, setTools] = useState<string>("");
  const [priorExperience, setPriorExperience] = useState<boolean | null>(null);
  const [learningNewSkills, setLearningNewSkills] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skills || !tools || priorExperience === null || learningNewSkills === null) {
      alert("Please complete all fields");
      return;
    }

    try {
      const response = await axios.post("/api/student/experience", {
        userId,
        skills: skills.split(",").map((s) => s.trim()), // Convert comma-separated string to array
        tools: tools.split(",").map((t) => t.trim()), // Convert comma-separated string to array
        priorExperience,
        learningNewSkills,
      });

      if (response.status === 200) {
        onNext({ skills, tools, priorExperience, learningNewSkills }); // ✅ Proceed to next step
      }
    } catch (error) {
      alert("Error saving experience");
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
          <Select onValueChange={(value) => setPriorExperience(value === "1")}>
            <SelectTrigger id="priorExperience" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Yes</SelectItem>
              <SelectItem value="2">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Learning new skills */}
        <div className="mb-4">
          <Label htmlFor="newSkills" className="block mb-2">
            Are you open to learning new skills on the job?
          </Label>
          <Select onValueChange={(value) => setLearningNewSkills(value === "1")}>
            <SelectTrigger id="newSkills" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Yes</SelectItem>
              <SelectItem value="2">No</SelectItem>
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
