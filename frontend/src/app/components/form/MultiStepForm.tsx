"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js Router for Redirecting
import { Stepper } from "../ui/progress"; 
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import { Button } from "@/src/components/ui/button";

export default function MultiStepForm({ closeDrawer }: { closeDrawer: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // Stores all form data
  const router = useRouter(); // ✅ Router for redirection

  // ✅ Redirect users to `/login` if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Get JWT from localStorage

    if (!token) {
      router.push("/login"); // ✅ Redirect to login if no token
    }
  }, []);

  const steps = [
    "Basic",
    "Experience",
    "Preferences",
    "Work Style",
    "Location of Availability",
    "Find a Placement",
  ];

  const handleNext = async (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData })); // ✅ Merge form data

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Stepper (Fixed at the top) */}
      <div className="w-full sticky top-0 bg-white z-50 p-4 mt-[20px]">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-[600px] flex flex-col gap-6">
          {currentStep === 1 && <Step1 onNext={handleNext} />}
          {currentStep === 2 && <Step2 onNext={handleNext} userId={""}/>}
          {currentStep === 3 && <Step3 onNext={handleNext} userId={""}/>}
          {currentStep === 4 && <Step4 onNext={handleNext} userId={""}/>}
          {currentStep === 5 && <Step5 onNext={handleNext} userId={""}/>}
          {currentStep === 6 && <Step6 />}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-[500px] flex gap-4 justify-center mt-6">
          {currentStep > 1 && (
            <Button onClick={handlePrevious} type="button" variant="default" className="w-full">
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
