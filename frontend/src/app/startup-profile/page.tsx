"use client"

import { useState } from "react"
import Navbar from "@/src/app/components/navbar"
import {
BookmarkSimple,
CalendarBlank,
ChatCircle,
DotsThreeVertical,
Heart,
MapPin,
PaperPlaneTilt,
UsersThree
} from "@phosphor-icons/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Drawer, DrawerTrigger, DrawerContent } from "@/src/components/ui/drawer"
import MultiStepForm from "@/src/app/components/form/MultiStepForm"
import Footer from "../components/footer"

export default function StudentProfile() {
  // Drawer open/close state
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header / Profile Banner */}
      <header className="bg-[var(--light-gray-green)] h-[300px] flex items-center justify-center">
        {/* Example avatar or logo */}
        <div className="w-[100px] h-[100px] bg-[var(--dark-green)] rounded-full" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-[100px] py-8">
        <div className="flex flex-col md:flex-row gap-[50px]">
          {/* LEFT COLUMN */}
          <div className="md:w-2/3 space-y-8">
            {/* Profile Info */}
            <section>
              <h1 className="text-4xl font-semibold">Student Name</h1>
              <p className="text-lg text-gray-600 mt-2">Future doctor</p>
              <div className="flex space-x-4 mt-4">
                <span className="px-3 py-1 bg-[var(--light-gray)] opacity-85 flex items-center gap-[5px] rounded-full text-sm">
                  <MapPin size={14} /> Location
                </span>
                <span className="px-3 py-1 bg-[var(--light-gray)] opacity-85 flex items-center gap-[5px] rounded-full text-sm">
                  <UsersThree size={14} /> Study Program
                </span>
                <span className="px-3 py-1 bg-[var(--light-gray)] opacity-85 flex items-center gap-[5px] rounded-full text-sm">
                  <CalendarBlank size={14} /> Joined since
                </span>
              </div>
            </section>

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere malesuada tristique
                lorem, ullamcorper nulla imperdiet in. Donec et urna id sapien convallis aliquet in ac magna.
              </p>
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
                        <p className="font-semibold">Company Name</p>
                        <p className="text-sm">The future of healthcare</p>
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
            {/* Wrap the “Discover Placements” button & card link in a single Drawer to open MultiStepForm */}
            <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
              {/* Button that triggers Drawer */}
              <DrawerTrigger asChild>
                <Button className="w-full bg-[var(--dark-green)] hover:bg-opacity-90 text-white rounded-full">
                  Discover Placements
                </Button>
              </DrawerTrigger>
              
              {/* "Messages" button (no drawer) */}
              <Button
                variant="outline"
                className="w-full border-[var(--dark-green)] text-[var(--dark-green)] rounded-full"
              >
                Messages
              </Button>

              {/* Placement Card with link that also opens the Drawer */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Want to find your perfect placement?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Discover tailored opportunities that match your skills and goals. Take the first step
                    toward your dream career today!
                  </p>
                  <p
                    className="text-sm text-blue-600 underline cursor-pointer"
                    onClick={() => setOpenDrawer(true)}
                  >
                    Find your next placement
                  </p>
                </CardContent>
              </Card>

              {/* The DrawerContent itself, showing the MultiStepForm */}
              <DrawerContent className="w-full h-full bg-white shadow-lg p-8">
                <MultiStepForm closeDrawer={() => setOpenDrawer(false)} />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
