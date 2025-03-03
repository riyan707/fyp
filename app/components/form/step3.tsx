"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/components/ui/select";

export default function Step3() {
  return (
    <div className="w-[500px] mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Job Preferences</h2>

      <form>
        {/* Internship Type */}
        <div className="mb-4">
          <Label htmlFor="internshipType" className="block mb-2">
            What type of internship are you looking for?
          </Label>
          <Select>
            <SelectTrigger id="internshipType" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short Term (<2 Monthts)">Short Term</SelectItem>
              <SelectItem value="Long Term (2 Monthts +)">Long Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Committed Hours */}
        <div className="mb-4">
          <Label htmlFor="committedHours" className="block mb-2">
          How many hours per week can you commit?
          </Label>
          <Select>
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

        {/* Internship Pref */}
        <div className="mb-4">
          <Label htmlFor="internshipPref" className="block mb-2">
          How many hours per week can you commit?
          </Label>
          <Select>
            <SelectTrigger id="internshipPref" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
              <SelectItem value="No Prefernces">No Prefernces</SelectItem>
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
          />
        </div>

        {/* Roles */}
        <div className="mb-4">
          <Label htmlFor="interestedRoles" className="block mb-2">
          What are your preferred industries?
          </Label>
          <Input
            id="interestedRoles"
            placeholder="e.g. UI/UX Designer, Software Engenieer, Marketer"
            className="w-full"
          />
        </div>

        {/* Equity Based */}
        <div className="mb-4">
          <Label htmlFor="equityBased" className="block mb-2">
          Would you be open to equity-based compensation in a startup?
          </Label>
          <Select>
            <SelectTrigger id="equityBased" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Don't Mind">Don't Mind</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
      </form>
    </div>
  );
}
