"use client";

import { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import Navbar from "../components/navbar";
import MultiStepForm from "../components/form/MultiStepForm";

const steps = ["Basic", "Experience", "Preferences", "Work Style", "Location & Availability", "Password"];

export default function StartupProfile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <header className="bg-light-gray-green h-[300px] flex items-center justify-center">
        <div className="w-[100px] h-[100px] bg-dark-green rounded-full"></div>
      </header>
      <main className="px-[100px] py-8">
        <section className="flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-semibold">Company Name</h1>
            <p className="text-lg text-gray mt-2">The future of healthcare</p>
            <div className="flex space-x-4 mt-4">
              <span className="px-3 py-1 bg-light-gray-green rounded-full text-sm">📍 Location</span>
              <span className="px-3 py-1 bg-light-gray-green rounded-full text-sm">🏢 Company Size</span>
              <span className="px-3 py-1 bg-light-gray-green rounded-full text-sm">📅 Joined since</span>
            </div>

            <h2 className="text-xl font-semibold mt-6">About</h2>
            <p className="text-sm mt-2 text-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Apply Button with Multi-Step Form Drawer */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="bg-light-gray-green text-dark-green px-6 py-2 rounded-full">
                  Apply
                </button>
              </DrawerTrigger>
              <DrawerContent className="w-full h-full mx-auto bg-white shadow-lg rounded-lg p-8">
                <MultiStepForm />
              </DrawerContent>
            </Drawer>
          </div>
        </section>
      </main>
    </div>
  );
}

