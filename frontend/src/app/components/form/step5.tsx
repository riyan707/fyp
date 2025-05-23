"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ Import router

export default function Step5({ onNext, userId }: { onNext: (data: any) => void; userId: string }) {
  const router = useRouter(); // ✅ Init router
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim() || !startDate.trim()) {
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
        "http://localhost:5000/api/student/location",
        { location, startDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onNext({ location, startDate });

        // ✅ Redirect to /match
        router.push("/match");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("🔥 Error saving location & availability:", error.response?.data || error);
      alert(error.response?.data?.message || "Error saving location & availability");
    }
  };

  return (
    <div className="w-[500px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Location & Availability</h2>
      <form onSubmit={handleSubmit}>
        {/* Location */}
        <div className="mb-4">
          <Label htmlFor="location" className="block mb-2">
            Which country/city are you located in?
          </Label>
          <Input
            id="location"
            placeholder="e.g. London, France, Miami, Qatar"
            className="w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <Label htmlFor="start" className="block mb-2">
            When can you start?
          </Label>
          <Input
            type="date"
            id="start"
            className="w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Save & Continue
        </Button>
      </form>
    </div>
  );
}
