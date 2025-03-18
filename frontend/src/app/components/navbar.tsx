import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Laptop, BezierCurve, BriefcaseMetal, GraduationCap, Buildings } from "@phosphor-icons/react";

export default function Signup() {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/auth/signup", { ...formData, role });
      if (response.status === 201) {
        if (role === "student") {
          navigate("/multistepform");
        } else {
          navigate("/startup-dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Left Section */}
        <div className="flex w-1/2 flex-col items-center justify-center p-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Get one step closer to achieving your career goals!
          </h2>
          <div className="mt-4 flex gap-6 text-green-900">
            <Laptop size={32} />
            <BezierCurve size={32} />
            <BriefcaseMetal size={32} />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 rounded-r-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-green-900">TalentLink</h2>
          <p className="mb-2 text-gray-600">
            Have an account? <a href="#" className="text-blue-600">Sign In</a>
          </p>
          <div className="flex gap-4">
            <button
              className={`flex items-center gap-2 rounded-lg border p-2 px-4 text-sm font-medium ${
                role === "student" ? "border-green-900 text-green-900" : "border-gray-300 text-gray-500"
              }`}
              onClick={() => setRole("student")}
            >
              <GraduationCap size={18} /> Student
            </button>
            <button
              className={`flex items-center gap-2 rounded-lg border p-2 px-4 text-sm font-medium ${
                role === "startup" ? "border-green-900 text-green-900" : "border-gray-300 text-gray-500"
              }`}
              onClick={() => setRole("startup")}
            >
              <Buildings size={18} /> Startup
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <form className="mt-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">Full name / Business name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Jane Smith"
              className="mt-1 w-full rounded-md border p-2 outline-none focus:border-green-700"
              required
            />

            <label className="mt-3 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="jane@framer.com"
              className="mt-1 w-full rounded-md border p-2 outline-none focus:border-green-700"
              required
            />

            <label className="mt-3 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border p-2 outline-none focus:border-green-700"
              required
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-black p-2 text-white hover:bg-gray-800"
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}