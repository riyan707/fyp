"use client";
import React from "react";
import { Button } from "@/components/ui/button";

// Extend the shape of a placement to include bullet points if needed
export type Placement = {
  title: string;
  description: string;
  bulletPoints?: string[];
};

interface PlacementCardProps {
  title: string;
  description: string;
  bulletPoints?: string[];
}

export function PlacementCard({ title, description, bulletPoints }: PlacementCardProps) {
  return (
    <div className="border border-gray-300 rounded-md p-5 shadow-sm">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2">{description}</p>

      {/* Bullet Points (if any) */}
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-gray-600">
          {bulletPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}

      {/* Apply Now button */}
      <div className="mt-4">
        <Button variant="default">Apply Now</Button>
      </div>
    </div>
  );
}
