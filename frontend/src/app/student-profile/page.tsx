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
import { Dialog, DialogTrigger, DialogContent } from "@/src/components/ui/dialog";
import Footer from "../components/footer";

export default function StudentProfile() {
  const router = useRouter();

  // State for student data
  const [student, setStudent] = useState<{ name: string; location?: string; degree?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fake applications data
  const applications = [
    { id: 1, company: "Tech Corp", role: "Software Engineer", status: "Accepted" },
    { id: 2, company: "Health Inc", role: "Research Assistant", status: "Waiting for Confirmation" }
  ];

  // ✅ Fetch Student Profile
  useEffect(() => {
    const fetchStudentProfile = async () => {
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

        if (response.data.role !== "STUDENT" || !response.data.profile) {
          setError("Access denied. Only students can view this page.");
          setTimeout(() => router.push("/"), 2000);
          return;
        }

        setStudent({
          name: response.data.name,
          location: response.data.profile.location,
          degree: response.data.profile.degree,
        });
      } catch (err: any) {
        console.error("🔥 Error fetching student profile:", err.response?.data || err);
        setError("Error fetching profile. Redirecting to login...");
        setTimeout(() => router.push("/"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [router]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header / Profile Banner */}
      <header className="bg-[var(--light-gray-green)] h-[300px] flex items-center justify-center">
        <div className="w-[100px] h-[100px] bg-[var(--dark-green)] rounded-full" />
      </header>

      {/* Main Content */}
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
                <h1 className="text-4xl font-semibold">{student?.name || "Student Name"}</h1>
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
                          <p className="font-semibold">{student?.name || "Student Name"}</p>
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
              {/* Track Applications */}
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[var(--dark-green)] hover:bg-opacity-90 text-white rounded-full">
                    Track Applications
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Application Tracker</h2>
                  {applications.map((app) => (
                    <Card key={app.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{app.company}</CardTitle>
                        <CardDescription>{app.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`font-medium ${app.status === "Accepted" ? "text-green-600" : "text-yellow-600"}`}>
                          {app.status}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={() => setOpenDialog(false)} className="w-full mt-4 bg-[var(--dark-green)] text-white">
                    Close
                  </Button>
                </DialogContent>
              </Dialog>
                
              {/* Messages */}
              <Button variant="outline" className="w-full border-[var(--dark-green)] text-[var(--dark-green)] rounded-full">
                Messages
              </Button>
                
              {/* AI Match Button */}
              <Button
                variant="outline"
                className="w-full border-[var(--dark-green)] text-[var(--dark-green)] rounded-full"
                onClick={() => router.push("/match")}
              >
                Find My Match
              </Button>
                
              {/* Placement Prompt (Edited) */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Haven’t registered for AI matching?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Fill out your placement preferences and experience to unlock personalised matches using our AI.
                  </p>
                  <p
                    className="text-sm text-blue-600 underline cursor-pointer"
                    onClick={() => router.push("/multistepform")}
                  >
                    Register now
                  </p>
                </CardContent>
              </Card>
            </div>
                
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
