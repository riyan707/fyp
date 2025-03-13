"use client";
import React, { useState, FormEvent } from "react";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { PlacementCard, Placement } from "../ui/PlacementCard"; // Adjust import path
import { useRouter } from "next/navigation"; // For closing the drawer if controlled via routing

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

export default function Step6({ closeDrawer }: { closeDrawer: () => void }) {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placements, setPlacements] = useState<Placement[] | null>(null);
  const router = useRouter(); // For closing drawer via routing

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Begin loading
    setIsLoading(true);

    // Simulate a delay for the algorithm search
    setTimeout(() => {
      setPlacements(placementSuggestions);
      setIsLoading(false);
    }, 2000);
  };

  const handleApply = () => {
    const confirmed = window.confirm("Are you sure you want to apply for this placement?");
    if (confirmed) {
      alert("Application submitted successfully!");
      closeDrawer(); // Call function to close the drawer
    }
  };

  return (
    <div className="w-full mx-auto">
      {!placements && (
        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create your Password</h2>

          <div className="mb-4 w-full">
            <Label htmlFor="password" className="block mb-2">
              Your Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••"
              className="w-full"
            />
          </div>

          <div className="mb-4 w-full">
            <Label htmlFor="rePassword" className="block mb-2">
              Re-enter password
            </Label>
            <Input
              id="rePassword"
              type="password"
              placeholder="•••••••••••"
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={isLoading || !password} className="w-full">
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit"}
          </Button>
        </form>
      )}

      {isLoading && (
        <div className="flex flex-col items-center mt-4">
          <Loader2 className="animate-spin w-6 h-6" />
          <p className="mt-2">Searching for the best placement...</p>
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
            <p className="text-gray-600">Didn&apos;t find what you were looking for?</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Discover More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
