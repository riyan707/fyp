"use client";
import React from "react";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/src/components/ui/select";

export default function Step2() {
  return (
    <div className="w-[500px] mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Skills & Experience</h2>

      <form>
        {/* Skills */}
        <div className="mb-4">
          <Label htmlFor="topSkills" className="block mb-2">
            What are your top three skills?
          </Label>
          <Input
            id="topSkills"
            placeholder="e.g. Python, UX design, Marketing, Data Analysis"
            className="w-full"
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
          />
        </div>

        {/* Prior Work Experience */}
        <div className="mb-4">
          <Label htmlFor="priorExperience" className="block mb-2">
            Do you have prior internship or work experience?
          </Label>
          <Select>
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
            Do you have prior internship or work experience?
          </Label>
          <Select>
            <SelectTrigger id="newSkills" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Yes</SelectItem>
              <SelectItem value="2">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
      </form>
    </div>
  );
}
