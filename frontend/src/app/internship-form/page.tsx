"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/components/ui/select";
import { Calendar } from "@/src/components/ui/calendar";

export default function InternshipForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    internshipType: "Internship",
    duration: "",
    workPreference: "Remote",
    skillsRequired: "",
    preferredIndustry: "",
    location: "",
    startDate: new Date(),
    salary: "", // ✅ NEW FIELD
    company: "", // ✅ NEW FIELD
    toolsRequired: "",
  });

  const [loading, setLoading] = useState(false);
  const [startupId, setStartupId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch authenticated startup ID
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not logged in! Please sign in first.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role === "STARTUP" && response.data.profile) {
          setStartupId(response.data.profile.id);
        } else {
          setError("Only startups can post internships.");
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          setError("Session expired. Redirecting to login...");
          localStorage.removeItem("token");
          setTimeout(() => router.push("/"), 2000);
        } else {
          setError("Error verifying user. Please log in again.");
        }
      }
    };

    fetchUser();
  }, [router]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!startupId) {
      setError("User not authenticated or not a startup.");
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    const internshipData = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      startupId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/internships",
        internshipData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Internship successfully posted!");
        setFormData({
          title: "",
          description: "",
          internshipType: "Internship",
          duration: "",
          workPreference: "Remote",
          skillsRequired: "",
          preferredIndustry: "",
          location: "",
          startDate: new Date(),
          salary: "",
          company: "",
          toolsRequired: "",
        });

        setTimeout(() => router.push("/startup-profile"), 1500);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error posting internship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Create an Internship</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="w-full max-w-2xl mb-6">
        <h2 className="text-lg font-semibold mb-2">Start Date</h2>
        <Calendar
          mode="single"
          selected={formData.startDate}
          onSelect={(date) => {
            if (date) setFormData({ ...formData, startDate: date });
          }}
          className="rounded-md border p-4 bg-white shadow"
        />
      </div>

      <Card className="w-full max-w-2xl shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Internship Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input name="title" placeholder="Internship Title" value={formData.title} onChange={handleChange} required />
            <Textarea name="description" placeholder="Describe the internship" value={formData.description} onChange={handleChange} required />

            <Select value={formData.internshipType} onValueChange={(value) => handleSelectChange("internshipType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Internship Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Apprenticeship">Apprenticeship</SelectItem>
                <SelectItem value="Work Experience">Work Experience</SelectItem>
              </SelectContent>
            </Select>

            <Input name="duration" placeholder="e.g., 3 months" value={formData.duration} onChange={handleChange} required />

            <Select value={formData.workPreference} onValueChange={(value) => handleSelectChange("workPreference", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="In-person">In-person</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Textarea name="skillsRequired" placeholder="Skills Required (comma-separated)" value={formData.skillsRequired} onChange={handleChange} required />
            <Input name="toolsRequired" placeholder="Tools Required (comma-separated)" value={formData.toolsRequired} onChange={handleChange}/>

            <Input name="preferredIndustry" placeholder="Preferred Industry" value={formData.preferredIndustry} onChange={handleChange} required />
            <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />

            {/* ✅ NEW FIELDS */}
            <Input name="company" placeholder="Company Name (e.g., Amazon, Google)" value={formData.company} onChange={handleChange} />
            <Input name="salary" placeholder="Salary (e.g., £23,999)" value={formData.salary} onChange={handleChange} />

            <Button type="submit" className="w-full" disabled={loading || !startupId}>
              {loading ? "Posting Internship..." : "Post Internship"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
