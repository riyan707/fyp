"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function EditStartupProfile() {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    foundedYear: "",
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
        const { profile } = res.data;
        setFormData({
          companyName: profile.companyName || "",
          website: profile.website || "",
          foundedYear: profile.foundedYear.toString() || "",
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
      await axios.put("http://localhost:5000/api/startup/edit", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Startup profile updated!");
      router.push("/startup-profile");
    } catch (err) {
      alert("Error updating profile.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Startup Profile</h1>
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
