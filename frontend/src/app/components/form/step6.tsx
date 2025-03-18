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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [placements, setPlacements] = useState<Placement[] | null>(null);

  useEffect(() => {
    // Simulate a loading delay before showing placements
    setTimeout(() => {
      setPlacements(placementSuggestions);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleApply = () => {
    const confirmed = window.confirm("Are you sure you want to apply for this placement?");
    if (confirmed) {
      alert("Application submitted successfully!");
    }
  };

  return (
    <div className="w-full mx-auto">
      {isLoading && (
        <div className="flex flex-col items-center mt-20">
          <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
          <p className="mt-4 text-lg text-gray-700">Finding the best placements for you...</p>
        </div>
      )}

      {placements && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Recommended Placements
          </h2>
          <div className="grid grid-cols-1 gap-4">
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
          <div className="flex justify-center mt-6">
            <Button onClick={handleApply} className="bg-green-600 hover:bg-green-700">
              Apply for Suggested Placements
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">Didn't find what you were looking for?</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Discover More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}