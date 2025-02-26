import Navbar from "../components/navbar";

export default function StartupProfile() {
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
        </section>
      </main>
    </div>
  );
}
