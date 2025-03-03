"use client";
import React, { useState } from "react";
import { Stepper } from "../ui/progress"; // adjust import path if needed
import Step1 from "./step1";
import { Button } from "@/components/ui/button";


export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  // Example list of step labels
  const steps = [
    "Basic",
    "Experience",
    "Preferences",
    "Work Style",
    "Location of Availability",
    "Password",
  ];

  const goNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full mx-auto p-6">

      {/* Render the stepper / progress bar */}
        <Stepper steps={steps} currentStep={currentStep} />

      <div className="flex flex-col justify-center items-center mt-[40px]">
        {/* Render form content based on current step */}
        <div className="mt-4">
          {currentStep === 1 && <div> <Step1/></div>}
          {currentStep === 2 && <div>Form content for step 2 (Experience)</div>}
          {currentStep === 3 && <div>Form content for step 3 (Preferences)</div>}
          {currentStep === 4 && <div>Form content for step 3 (Preferences)</div>}
          {currentStep === 5 && <div>Form content for step 3 (Preferences)</div>}
          {currentStep === 6 && <div>Form content for step 3 (Preferences)</div>}
        </div>

        {/* Example buttons to navigate steps */}
        <div className="max-w-[500px] mt-[20px] flex gap-4">

          {/* Submit Button */}
          <Button
            onClick={goPrevious}
            type="submit"
            variant="default"
            className="w-full"
          >
            Submit
          </Button>

          {/* Submit Button */}
          <Button
            onClick={goNext}
            type="submit"
            variant="default"
            className="w-full"
          >
            Submit
          </Button>

        </div>
      </div>

    </div>
  );
}
