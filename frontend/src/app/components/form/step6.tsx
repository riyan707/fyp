"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import { PlacementCard, Placement } from "../ui/PlacementCard";

// Simulated placement suggestions
const placementSuggestions: Placement[] = [
  {
    title: "Software Development Engineer, AWS",
    description:
      "Join our team as a Software Engineer, where you'll gain hands-on experience on real-world projects in AWS cloud.",
    bulletPoints: [
      "Proficiency in at least one programming language (Python, Java, C#)",
      "Basic understanding of AWS services (Lambda, EC2, S3, DynamoDB)",
      "Strong problem-solving and communication skills",
    ],
  },
  {
    title: "UI/UX Designer, Google",
    description:
      "Contribute to creating user-friendly, visually stunning, and intuitive experiences for a wide range of Google products.",
    bulletPoints: [
      "Pursuing a degree in UX/UI Design, Graphic Design, or related field",
      "Strong portfolio showcasing design thinking and creativity",
      "Knowledge of Figma or Sketch",
    ],
  },
  {
    title: "Sales and Marketing, Meta",
    description:
      "Gain hands-on experience in digital marketing, sales strategy, and data-driven decision-making at Meta.",
    bulletPoints: [
      "Pursuing a degree in Marketing, Business, or Communications",
      "Experience with Google Analytics or Meta Business Suite",
      "Excellent communication and analytical skills",
    ],
  },
];

export default function Step6() {
  const [isLoading, setIsLoading] = useState(true);
  const [placements, setPlacements] = useState<Placement[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPlacements(placementSuggestions);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleApply = () => {
    const confirmed = window.confirm("Are you sure you want to apply to all recommended placements?");
    if (confirmed) {
      alert("🎉 Application submitted to all placements successfully!");
    }
  };

  return (
    <div className="w-full mx-auto px-4 md:px-0">
      {isLoading && (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
          <p className="mt-4 text-lg text-gray-700">Finding the best placements for you...</p>
        </div>
      )}

      {placements && (
        <div className="mt-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            🎯 Recommended Placements
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {placements.map((placement, index) => (
              <PlacementCard
                key={index}
                title={placement.title}
                description={placement.description}
                bulletPoints={placement.bulletPoints}
              />
            ))}
          </div>

          {/* Apply Button */}
          <div className="flex justify-center mt-10">
            <Button
              onClick={handleApply}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full text-white text-md"
            >
              Apply to All
            </Button>
          </div>

          {/* Discover More Section */}
          <div className="text-center mt-10">
            <p className="text-gray-600 text-sm">Still exploring options?</p>
            <button className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
              Discover More Opportunities
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
