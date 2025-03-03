"use client";
import * as React from "react";

interface StepperProps {
  steps: string[];     // e.g. ["Basic", "Experience", "Preferences", ...]
  currentStep: number; // 1-based index
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const totalSteps = steps.length;

  // Calculate the center position for the current step's dot.
  // For a grid of equal-width columns, the center of step i (1-indexed) is at ((i - 0.5) / totalSteps)*100%
  const dotPosition = ((currentStep - 0.5) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Track */}
      <div className="relative w-full h-1 bg-gray-200 rounded">
        {/* Progress Fill always starts from 0% */}
        <div
          className="absolute top-0 h-1 bg-green-600 rounded transition-all duration-300"
          style={{
            left: `0%`,
            width: `${dotPosition}%`,
          }}
        />
        {/* Current Step Dot */}
        <div
          className="absolute w-3 h-3 bg-green-600 rounded-full transition-all duration-300"
          style={{
            left: `${dotPosition}%`,
            transform: "translateX(-50%)",
            top: "-0.25rem",
          }}
        />
      </div>

      {/* Step Labels */}
      <div
        className="mt-3 grid text-center"
        style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
      >
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          return (
            <div
              key={index}
              className={
                isActive
                  ? "text-sm font-medium text-green-700"
                  : "text-sm text-gray-500"
              }
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
