"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Step1() {
  return (
    <div className="w-[500px] mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create your Password</h2>

      <form>
        {/*Password */}
        <div className="mb-4">
          <Label htmlFor="password" className="block mb-2">
            Your Password
          </Label>
          <Input
            id="password"
            placeholder="•••••••••••"
            className="w-full"
          />
        </div>

        {/* Re-enter */}
        <div className="mb-4">
          <Label htmlFor="rePassword" className="block mb-2">
            Re-enter password
          </Label>
          <Input
            id="rePassword"
            placeholder="•••••••••••"
            className="w-full"
          />
        </div>
        
      </form>
    </div>
  );
}
