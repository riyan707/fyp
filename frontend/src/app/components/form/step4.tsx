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

    if (!workPreference || !softSkill || !softSkillDescription) {
      alert("Please complete all fields");
      return;
    }

    try {
      const response = await axios.post("/api/student/personality", {
        userId,
        workPreference,
        softSkill,
        softSkillDescription,
      });

      if (response.status === 200) {
        onNext({ workPreference, softSkill, softSkillDescription }); // ✅ Proceed to next step
      }
    } catch (error) {
      alert("Error saving work style and personality");
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
