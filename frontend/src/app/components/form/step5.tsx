"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import axios from "axios";

export default function Step5({ onNext, userId }: { onNext: (data: any) => void; userId: string }) {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location || !startDate) {
      alert("Please complete all fields");
      return;
    }

    try {
      const response = await axios.post("/api/student/location", {
        userId,
        location,
        startDate,
      });

      if (response.status === 200) {
        onNext({ location, startDate }); // ✅ Proceed to next step
      }
    } catch (error) {
      alert("Error saving location and availability");
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

        {/* When can you start? */}
        <div className="mb-4">
          <Label htmlFor="start" className="block mb-2">
            When can you start?
          </Label>
          <Input
            id="start"
            placeholder="e.g. Immediate, Next Month, Specific Date"
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
