"use client";
import * as React from "react";

interface StepperProps {
  steps: string[];     // e.g. ["Basic", "Experience", "Preferences", ...]
  currentStep: number; // 1-based index
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const totalSteps = steps.length;
  const dotPosition = ((currentStep - 0.5) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Track */}
      <div className="relative w-full h-1 bg-[var(--light-gray-green)] rounded">
        {/* Progress Fill */}
        <div
          className="absolute top-0 h-1 bg-[var(--dark-green)] rounded transition-all duration-300"
          style={{
            left: `0%`,
            width: `${dotPosition}%`,
          }}
        />
        {/* Current Step Dot */}
        <div
          className="absolute w-3 h-3 bg-[var(--dark-green)] rounded-full transition-all duration-300"
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
                  ? "text-sm font-medium text-[var(--dark-green)]"
                  : "text-sm text-gray-500"
              }
            >
              {step}
            </div>
          );
        })}
      </div>
      
      {/* Divider Line */}
      <div className="w-full h-[1px] bg-[var(--dark-green)] opacity-50 mt-[30px]"></div>

    </div>
  );
}
