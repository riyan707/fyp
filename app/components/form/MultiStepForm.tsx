"use client";
import React, { useState } from "react";
import { Stepper } from "../ui/progress"; // adjust import path if needed
import Step1 from "./step1";
import { Button } from "@/components/ui/button";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";


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
          {currentStep === 1 && <div> <Step1/> </div>}
          {currentStep === 2 && <div> <Step2/> </div>}
          {currentStep === 3 && <div> <Step3/> </div>}
          {currentStep === 4 && <div> <Step4/> </div>}
          {currentStep === 5 && <div> <Step5/> </div>}
          {currentStep === 6 && <div> <Step6/> </div>}
        </div>

        {/* Example buttons to navigate steps */}
        <div className="w-[500px] mt-[20px] flex gap-4">
          <Button
            onClick={goPrevious}
            type="submit"
            variant="default"
            className="w-full"
          >
            Back
          </Button>
          {currentStep !== steps.length && (
            <Button
              onClick={goNext}
              type="submit"
              variant="default"
              className="w-full"
            >
              Next
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}
