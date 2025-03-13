"use client";
import React from "react";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/src/components/ui/select";

export default function Step1() {
  return (
    <div className="w-[500px] mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Work Style & Personality</h2>

      <form>
        {/* Full Name */}
        <div className="mb-4">
          <Label htmlFor="fullName" className="block mb-2">
            What is your strongest soft skill?
          </Label>
          <Input
            id="softSkill"
            placeholder="e.g. Problem Solving, Teamwork, Adaptability"
            className="w-full"
          />
        </div>

        {/* Work Prefernces*/}
        <div className="mb-4">
          <Label htmlFor="workPref" className="block mb-2">
          How do you prefer working?
          </Label>
          <Select>
            <SelectTrigger id="workPref" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Remote</SelectItem>
              <SelectItem value="2">In-House</SelectItem>
              <SelectItem value="3">Don't Mind</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
      </form>
    </div>
  );
}
