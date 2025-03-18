"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Laptop, BezierCurve, Briefcase, GraduationCap, Building } from "@phosphor-icons/react";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState<boolean>(true); // ✅ Toggle between Sign Up & Login
  const [role, setRole] = useState<string>("STUDENT");
  const [formData, setFormData] = useState<{ name?: string; email: string; password: string }>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignup) {
        // ✅ Signup request
        const response = await axios.post("http://localhost:5000/api/auth/signup", {
          ...formData,
          role,
        });
        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          router.push("/multistepform");
        }
      } else {
        // ✅ Login request
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          router.push("/multistepform"); // Redirect after login
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg transition-all duration-300">
        {/* Left Section */}
        <div className="flex w-1/2 flex-col items-center justify-center p-8 bg-gray-100">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Get one step closer to achieving your career goals!
          </h2>
          <div className="mt-4 flex gap-6 text-gray-800">
            <Laptop size={32} />
            <BezierCurve size={32} />
            <Briefcase size={32} />
          </div>
        </div>

        {/* Right Section - Signup/Login Toggle */}
        <div className="w-1/2 rounded-r-lg bg-white p-8 shadow-md transition-all duration-500">
          <h2 className="mb-4 text-xl opacity-60 text-center font-regular text-gray-800">TalentLink</h2>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">{isSignup ? "Sign Up" : "Sign In"}</h2>

          <p className="mb-2 text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 underline">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {/* Role Selection (Only for Sign Up) */}
          {isSignup && (
            <div className="flex gap-4">
              <button
                className={`flex items-center gap-2 rounded-lg border p-2 px-4 text-sm font-medium ${
                  role === "STUDENT" ? "border-green-900 text-green-900" : "border-gray-300 text-gray-500"
                }`}
                onClick={() => setRole("STUDENT")}
              >
                <GraduationCap size={18} /> Student
              </button>
              <button
                className={`flex items-center gap-2 rounded-lg border p-2 px-4 text-sm font-medium ${
                  role === "STARTUP" ? "border-green-900 text-green-900" : "border-gray-300 text-gray-500"
                }`}
                onClick={() => setRole("STARTUP")}
              >
                <Building size={18} /> Startup
              </button>
            </div>
          )}

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <form className="mt-4" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <label className="block text-sm font-medium text-gray-700">Full name / Business name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Smith"
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border p-2 outline-none focus:border-green-700"
                  required
                />
              </>
            )}

            <label className="mt-3 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane@email.com"
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border p-2 outline-none focus:border-green-700"
              required
            />

            <label className="mt-3 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border p-2 outline-none focus:border-green-700"
              required
            />

            <button type="submit" className="mt-4 w-full rounded-md bg-black p-2 text-white hover:bg-gray-800">
              {isSignup ? "Create an Account" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
