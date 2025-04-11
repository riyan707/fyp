"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function EditStudentProfile() {
  const [formData, setFormData] = useState({
    name: "",
    yearOfStudy: 1,
    degree: "",
    skills: "",
    tools: "",
    preferredIndustries: "",
    interestedRoles: "",
    committedHours: "",
    internshipType: "",
    workPreference: "",
    softSkill: "",
    softSkillDescription: "",
    location: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { profile, name } = res.data;
        setFormData({
          name: name || "",
          yearOfStudy: profile.yearOfStudy || 1,
          degree: profile.degree || "",
          skills: profile.skills.join(", "),
          tools: profile.tools.join(", "),
          preferredIndustries: profile.preferredIndustries.join(", "),
          interestedRoles: profile.interestedRoles.join(", "),
          committedHours: profile.committedHours || "",
          internshipType: profile.internshipType || "",
          workPreference: profile.workPreference || "",
          softSkill: profile.softSkill || "",
          softSkillDescription: profile.softSkillDescription || "",
          location: profile.location || "",
        });
      });
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        tools: formData.tools.split(",").map((t) => t.trim()),
        preferredIndustries: formData.preferredIndustries.split(",").map((i) => i.trim()),
        interestedRoles: formData.interestedRoles.split(",").map((r) => r.trim()),
      };

      const res = await axios.put("http://localhost:5000/api/student/edit", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated!");
      router.push("/student-profile");
    } catch (err) {
      alert("Error updating profile.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Student Profile</h1>
      {Object.entries(formData).map(([key, val]) => (
        <div className="mb-4" key={key}>
          <Label htmlFor={key} className="capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </Label>
          <Input id={key} name={key} value={val} onChange={handleChange} />
        </div>
      ))}
      <Button onClick={handleSave} className="mt-4">
        Save Changes
      </Button>
    </div>
  );
}
