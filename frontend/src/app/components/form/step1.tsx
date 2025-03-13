"use client";
import React from "react";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/src/components/ui/select";

export default function Step1() {
  return (
    <div className="w-[500px] mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Basic Information</h2>

      <form>
        {/* Full Name */}
        <div className="mb-4">
          <Label htmlFor="fullName" className="block mb-2">
            What is your full name?
          </Label>
          <Input
            id="fullName"
            placeholder="Jane Smith"
            className="w-full"
          />
        </div>

        {/* Year of Study */}
        <div className="mb-4">
          <Label htmlFor="yearOfStudy" className="block mb-2">
            What is your year of study?
          </Label>
          <Select>
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
          />
        </div>

        
      </form>
    </div>
  );
}
