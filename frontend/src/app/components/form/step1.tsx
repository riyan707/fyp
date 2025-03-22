"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import axios from "axios";

export default function Step1({ onNext }: { onNext: (data: any) => void }) {
  const [yearOfStudy, setYearOfStudy] = useState<number | null>(null);
  const [degree, setDegree] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!yearOfStudy || !degree) {
      alert("Please complete all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in! Please sign in first.");
      return;
    }

    try {
      // ✅ Send only Year of Study & Degree
      const response = await axios.post(
        "http://localhost:5000/api/student/profile",
        {
          yearOfStudy,
          degree,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("✅ Profile saved:", response.data);
        onNext({ yearOfStudy, degree });
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("🔥 Error saving profile:", error.response?.data || error);
      alert(error.response?.data?.message || "Error saving profile");
    }
  };

  return (
    <div className="w-[500px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Basic Information</h2>

      <form onSubmit={handleSubmit}>
        {/* Year of Study */}
        <div className="mb-4">
          <Label htmlFor="yearOfStudy" className="block mb-2">
            What is your year of study?
          </Label>
          <Select onValueChange={(value) => setYearOfStudy(parseInt(value, 10))}>
            <SelectTrigger id="yearOfStudy" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Year 1</SelectItem>
              <SelectItem value="2">Year 2</SelectItem>
              <SelectItem value="3">Year 3</SelectItem>
              <SelectItem value="4">Year 4</SelectItem>
              <SelectItem value="5">Year 5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Degree */}
        <div className="mb-6">
          <Label htmlFor="degree" className="block mb-2">
            What degree are you pursuing?
          </Label>
          <Input
            id="degree"
            placeholder="e.g. Computer Science, Marketing, Business..."
            className="w-full"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Save & Continue
        </Button>
      </form>
    </div>
  );
}
