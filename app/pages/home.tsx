import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Logo</h1>
        <nav className="flex gap-4">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Post a job</a>
          <a href="#" className="hover:underline">Student profiles</a>
          <a href="#" className="hover:underline">Messages</a>
        </nav>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Find your next placement</button>
      </header>

      {/* Main Section */}
      <main className="container mx-auto mt-8 px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-400 rounded-full mr-6"></div>
            <div>
              <h2 className="text-2xl font-bold">Company Name</h2>
              <p className="text-gray-600">The future of healthcare</p>
              <div className="flex gap-4 mt-2">
                <span className="text-sm bg-gray-200 py-1 px-3 rounded-full">Location</span>
                <span className="text-sm bg-gray-200 py-1 px-3 rounded-full">Company Size</span>
                <span className="text-sm bg-gray-200 py-1 px-3 rounded-full">Joined since</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Apply</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Message</button>
          </div>

          <aside className="mt-6 bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-bold">Want to find your perfect placement?</h3>
            <p className="text-gray-600 mt-2">
              Discover tailored opportunities that match your skills and goals. Take the first step toward your dream career today!
            </p>
            <a href="#" className="text-green-500 hover:underline mt-2 block">Find your next placement</a>
          </aside>

          <section className="mt-8">
            <h3 className="text-xl font-bold">About</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere metus tincidunt laoreet ullamcorper. Nulla eget mi justo. Sed at aliquet magna. Donec auctor dictum felis in luctus. Nullam sed varius nunc, id ultricies metus. Donec bibendum sed ipsum finibus vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit nisi tortor, id dignissim sapien volutpat sit amet.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-bold">Activity</h3>
            <div className="mt-4 bg-gray-50 p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Company Name</h4>
                    <p className="text-sm text-gray-600">The future of healthcare</p>
                    <p className="text-sm text-gray-500">Posted 0h ago</p>
                  </div>
                </div>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">Follow</button>
              </div>
              <p className="text-gray-600 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere metus tincidunt laoreet ullamcorper. Nulla eget mi justo. Sed at aliquet magna. Donec auctor dictum felis in luctus. Nullam sed varius nunc, id ultricies metus. Donec bibendum sed ipsum finibus vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit nisi tortor, id dignissim sapien volutpat sit amet.
              </p>
              <div className="mt-4 bg-gray-200 h-32 rounded"></div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
