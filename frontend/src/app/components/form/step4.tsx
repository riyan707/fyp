"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import axios from "axios";

export default function Step4({ onNext, userId }: { onNext: (data: any) => void; userId: string }) {
  const [workPreference, setWorkPreference] = useState<string | null>(null);
  const [softSkill, setSoftSkill] = useState<string>("");
  const [softSkillDescription, setSoftSkillDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("📤 Submitting values:", { workPreference, softSkill, softSkillDescription });
  
    if (!workPreference || !softSkill.trim() || !softSkillDescription.trim()) {
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
        "http://localhost:5000/api/student/personality", // ✅ Correct API route
        {
          workPreference,
          softSkill,
          softSkillDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("✅ Work style & personality saved:", response.data);
        onNext({ workPreference, softSkill, softSkillDescription });
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("🔥 Error saving work style & personality:", error.response?.data || error);
      alert(error.response?.data?.message || "Error saving work style & personality");
    }
  };
  

  return (
    <div className="w-[500px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Work Style & Personality</h2>

      <form onSubmit={handleSubmit}>
        {/* Work Preferences */}
        <div className="mb-4">
          <Label htmlFor="workPref" className="block mb-2">
            How do you prefer working?
          </Label>
          <Select onValueChange={(value) => setWorkPreference(value)}>
            <SelectTrigger id="workPref" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="In-House">In-House</SelectItem>
              <SelectItem value="Don't Mind">Don't Mind</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Soft Skill */}
        <div className="mb-4">
          <Label htmlFor="softSkill" className="block mb-2">
            What is your strongest soft skill?
          </Label>
          <Input
            id="softSkill"
            placeholder="e.g. Problem Solving, Teamwork, Adaptability"
            className="w-full"
            value={softSkill}
            onChange={(e) => setSoftSkill(e.target.value)}
          />
        </div>

        {/* Soft Skills Textarea */}
        <div className="mb-4">
          <Label htmlFor="softSkillsDescription" className="block mb-2">
            Describe how you have used your soft skills before?
          </Label>
          <Textarea
            id="softSkillsDescription"
            placeholder="Share examples of when you've used your soft skills — no achievement is too small."
            className="w-full"
            value={softSkillDescription}
            onChange={(e) => setSoftSkillDescription(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Save & Continue
        </Button>
      </form>
    </div>
  );
}
