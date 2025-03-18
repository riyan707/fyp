"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import axios from "axios";

export default function Step3({ onNext, userId }: { onNext: (data: any) => void; userId: string }) {
  const [internshipType, setInternshipType] = useState<string | null>(null);
  const [committedHours, setCommittedHours] = useState<string | null>(null);
  const [preferredIndustries, setPreferredIndustries] = useState<string>("");
  const [interestedRoles, setInterestedRoles] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!internshipType || !committedHours || !preferredIndustries || !interestedRoles) {
      alert("Please complete all fields");
      return;
    }

    try {
      const response = await axios.post("/api/student/preferences", {
        userId,
        internshipType,
        committedHours,
        preferredIndustries: preferredIndustries.split(",").map((i) => i.trim()), // Convert to array
        interestedRoles: interestedRoles.split(",").map((r) => r.trim()), // Convert to array
      });

      if (response.status === 200) {
        onNext({ internshipType, committedHours, preferredIndustries, interestedRoles }); // ✅ Proceed to next step
      }
    } catch (error) {
      alert("Error saving job preferences");
    }
  };

  return (
    <div className="w-[500px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Job Preferences</h2>

      <form onSubmit={handleSubmit}>
        {/* Internship Type */}
        <div className="mb-4">
          <Label htmlFor="internshipType" className="block mb-2">
            What type of internship would you prefer?
          </Label>
          <Select onValueChange={(value) => setInternshipType(value)}>
            <SelectTrigger id="internshipType" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short Term">Short Term</SelectItem>
              <SelectItem value="Long Term">Long Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Committed Hours */}
        <div className="mb-4">
          <Label htmlFor="committedHours" className="block mb-2">
            How many hours per week can you commit?
          </Label>
          <Select onValueChange={(value) => setCommittedHours(value)}>
            <SelectTrigger id="committedHours" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<7 Hours">7hrs</SelectItem>
              <SelectItem value="8 Hours - 16 Hours">8hrs - 16hrs</SelectItem>
              <SelectItem value="16 Hours - 32 Hours">16hrs - 32hrs</SelectItem>
              <SelectItem value="32 Hours+">32 Hours+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Industry */}
        <div className="mb-4">
          <Label htmlFor="preferredIndustry" className="block mb-2">
            What are your preferred industries?
          </Label>
          <Input
            id="preferredIndustry"
            placeholder="e.g. Fintech, Automotive, Healthcare, AI, SaaS"
            className="w-full"
            value={preferredIndustries}
            onChange={(e) => setPreferredIndustries(e.target.value)}
          />
        </div>

        {/* Roles */}
        <div className="mb-4">
          <Label htmlFor="interestedRoles" className="block mb-2">
            What type of role are you interested in?
          </Label>
          <Input
            id="interestedRoles"
            placeholder="e.g. UI/UX Designer, Software Engineer, Marketer"
            className="w-full"
            value={interestedRoles}
            onChange={(e) => setInterestedRoles(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Save & Continue
        </Button>
      </form>
    </div>
  );
}
