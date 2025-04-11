"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default function MatchRecommendations() {
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/match", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data);
      } catch (err) {
        console.error("Match fetch error:", err);
        setError("Could not load matches.");
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ✅ Back Button */}
      <Button variant="outline" className="mb-4" onClick={() => router.back()}>
        ← Back
      </Button>

      <h1 className="text-3xl font-bold mb-4">Top Matches</h1>

      {/* ✅ Navigation Buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => router.push("/student-profile")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Home
        </Button>
        <Button
          onClick={() => router.push("/discover")}
          variant="outline"
        >
          Discover More
        </Button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {matches.length > 0 ? (
        matches.map((job, index) => (
          <Card key={job.id} className="mb-6 shadow">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {job.company} • {job.location} • {job.salary || "Salary not specified"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-gray-700">{job.description}</p>
              <p className="text-sm text-gray-500">Match Score: {job.score.toFixed(1)}%</p>
              <Button className="mt-3">Learn More</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-600">No matches found.</p>
      )}
    </div>
  );
}
