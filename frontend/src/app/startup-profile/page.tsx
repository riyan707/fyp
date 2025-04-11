"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/src/app/components/navbar";
import {
  BookmarkSimple,
  CalendarBlank,
  ChatCircle,
  DotsThreeVertical,
  Heart,
  MapPin,
  PaperPlaneTilt,
  UsersThree
} from "@phosphor-icons/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Footer from "../components/footer";

export default function StartupProfile() {
  const router = useRouter();
  const [startup, setStartup] = useState<{
    companyName: string;
    website?: string;
    foundedYear?: number;
    location?: string;
  } | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartupProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in! Redirecting...");
        setTimeout(() => router.push("/"), 2000);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role !== "STARTUP" || !response.data.profile) {
          setError("Access denied. Only startups can view this page.");
          setTimeout(() => router.push("/"), 2000);
          return;
        }

        setStartup(response.data.profile);

        // Fetch listings
        const listingsRes = await axios.get("http://localhost:5000/api/internships", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const startupListings = listingsRes.data.filter(
          (listing: any) => listing.startup.companyName === response.data.profile.companyName
        );

        setListings(startupListings);
      } catch (error: any) {
        console.error("🔥 Error fetching startup profile:", error.response?.data || error);
        setError("Error fetching profile. Redirecting to login...");
        setTimeout(() => router.push("/"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupProfile();
  }, [router]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />

      <header className="bg-[var(--light-gray-green)] h-[300px] flex items-center justify-center">
        <div className="w-[100px] h-[100px] bg-[var(--dark-green)] rounded-full" />
      </header>

      <main className="flex-1 px-4 md:px-[100px] py-8">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-[50px]">
            {/* LEFT COLUMN */}
            <div className="md:w-2/3 space-y-8">
              {/* Profile Info */}
              <section>
                <h1 className="text-4xl font-semibold">{startup?.companyName || "Startup Name"}</h1>
              </section>

              {/* Activity Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Activity</h2>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="flex gap-[10px]">
                        <div className="w-[80px] h-[80px] bg-[var(--dark-green)] rounded-full" />
                        <div>
                          <p className="font-semibold">{startup?.companyName || "Company Name"}</p>
                          <p className="text-sm">The future of technology</p>
                          <p className="text-xs text-gray-600">Posted 6h ago</p>
                        </div>
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <Button className="bg-[var(--light-gray-green)]">Follow</Button>
                        <DotsThreeVertical size={32} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere malesuada tristique
                      lorem, ullamcorper nulla imperdiet in. Donec et urna id sapien convallis aliquet in ac magna.
                    </p>
                    <div className="bg-[var(--light-gray-green)] w-full h-[500px] rounded-md my-4" />
                    <div className="flex justify-between">
                      <div className="flex gap-[10px]">
                        <Heart size={26} />
                        <ChatCircle size={26} />
                        <PaperPlaneTilt size={26} />
                      </div>
                      <div className="flex gap-[10px]">
                        <BookmarkSimple size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:w-1/3 flex flex-col items-start space-y-4">
              <Button
                className="w-full bg-[var(--dark-green)] hover:bg-opacity-90 text-white rounded-full"
                onClick={() => router.push("/internship-form")}
              >
                Post a Position
              </Button>

              <Button
                variant="outline"
                className="w-full border-[var(--dark-green)] text-[var(--dark-green)] rounded-full"
              >
                Messages
              </Button>

              {/* Current Listings */}
              <section className="w-full mt-4">
                <h3 className="text-md font-semibold mb-4">Your Listings</h3>
                {listings.length > 0 ? (
                  listings.map((listing) => (
                    <Card
                      key={listing.id}
                      className="mb-4 border border-gray-200 rounded-xl shadow-sm bg-white p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-[85%]">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">{listing.title}</h4>
                          <p className="text-sm text-gray-500 mb-1">{listing.company || startup?.companyName}</p>
                          <p className="text-sm text-gray-700 mb-1">{listing.location}</p>
                          <p className="text-sm text-gray-700 mb-1">
                            {listing.internshipType} · {listing.duration}
                          </p>
                          {listing.salary && (
                            <p className="text-sm text-gray-700 mb-1">Salary: {listing.salary}</p>
                          )}
                          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{listing.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Start: {new Date(listing.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-2">
                          <Button
                            size="sm"
                            onClick={() => router.push(`/edit-internship/${listing.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No listings yet.</p>
                )}
              </section>
              
              
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
