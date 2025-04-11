"use client";
import { Bell, UserCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(response.data.role);
      } catch (err) {
        console.error("🔥 Error fetching user role:", err);
      }
    };

    fetchRole();
  }, []);

  const handleEditProfile = () => {
    if (role === "STUDENT") router.push("/edit-student-profile");
    else if (role === "STARTUP") router.push("/edit-startup-profile");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 relative">
      {/* Left: Logo */}
      <Link href="/" className="text-xl font-bold text-green-900">
        TalentLink
      </Link>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex gap-6 text-gray-700">
        <Link href="/discover" className="hover:text-green-900">Discover</Link>
        <Link href="/messages" className="hover:text-green-900">Messages</Link>
      </div>

      {/* Right: Icons and Button */}
      <div className="flex items-center gap-4 relative">
        <Bell className="w-6 h-6 text-green-900 cursor-pointer" />

        {/* Profile Dropdown */}
        <div className="relative">
          <UserCircle
            className="w-8 h-8 text-green-900 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              <button
                onClick={handleEditProfile}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-gray-400" />

        {/* CTA Button */}
        <Button variant="outline" className="border-green-900 text-green-900 hidden md:flex">
          Find your next placement
        </Button>
      </div>
    </nav>
  );
}
