"use client";
import React from "react";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";


export default function Step1() {
  return (
    <div className="w-[500px] mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Location & Availability</h2>

      <form>
        {/* Location */}
        <div className="mb-4">
          <Label htmlFor="location" className="block mb-2">
            Which country/city are you located in?
          </Label>
          <Input
            id="location"
            placeholder="e.g. London, France, Miami, Qatar"
            className="w-full"
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
          />
        </div>
        
      </form>
    </div>
  );
}
