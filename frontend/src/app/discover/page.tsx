"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/src/app/components/navbar";
import Footer from "@/src/app/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";

const ITEMS_PER_PAGE = 5;

export default function Discover() {
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/internships");
        setJobListings(response.data);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setError("Failed to load internships. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const totalPages = Math.ceil(jobListings.length / ITEMS_PER_PAGE);
  const paginatedListings = jobListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Recommended Placements</h1>
        <p className="text-gray-600 mb-6">
          Find the most popular placements on the market at the moment.
        </p>

        {loading ? (
          <p className="text-center text-gray-600">Loading internships...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <div className="space-y-6">
              {paginatedListings.length > 0 ? (
                paginatedListings.map((job, index) => (
                  <Card key={index} className="bg-white shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {job.company || job.startup?.companyName || "Unknown Company"} — {job.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-2">
                        {job.internshipType} • {job.workPreference} • {job.duration}
                      </p>
                      <p className="text-gray-700 mb-3">{job.description}</p>
                      {job.skillsRequired && (
                        <ul className="text-sm text-gray-700 list-disc pl-5 mb-3">
                          {job.skillsRequired.split(",").map((skill: string, i: number) => (
                            <li key={i}>{skill.trim()}</li>
                          ))}
                        </ul>
                      )}
                      {job.salary && (
                        <p className="text-green-700 font-semibold mb-1">💰 {job.salary}</p>
                      )}
                      <Button variant="default">Learn More</Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-600">No internships available at the moment.</p>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  variant="outline"
                >
                  Previous
                </Button>
                <p className="text-sm text-gray-700 pt-2">Page {currentPage} of {totalPages}</p>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
