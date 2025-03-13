"use client";
import React, { useState } from "react";
import { Stepper } from "../ui/progress"; // Adjust import path if needed
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import { Button } from "@/src/components/ui/button";

export default function MultiStepForm({ closeDrawer }: { closeDrawer: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);

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
    <div className="flex flex-col h-screen">
      {/* Stepper (Fixed at the top) */}
      <div className="w-full sticky top-0 bg-white z-50 p-4">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-[600px] flex flex-col gap-6">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
          {currentStep === 6 && <Step6 closeDrawer={closeDrawer} />}
        </div>

        {/* Navigation Buttons */}
        {currentStep < steps.length && (
          <div className="w-full max-w-[500px] flex gap-4 justify-center mt-6">
            <Button
              onClick={goPrevious}
              type="button"
              variant="default"
              className="w-full"
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              onClick={goNext}
              type="button"
              variant="default"
              className="w-full"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
