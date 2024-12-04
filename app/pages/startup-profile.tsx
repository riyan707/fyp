import Navbar from "../components/navbar";

const StartupProfile = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <header className="bg-light-gray-green h-[300px] flex items-center justify-center">
        <div className="w-[100px] h-[100px] bg-dark-green rounded-full"></div>
      </header>
      <main className="px-[100px] py-8">
        <section className="flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-2/3">
            {/* Company Info */}
            <h1 className="text-4xl font-semibold">Company Name</h1>
            <p className="text-lg text-gray mt-2">The future of healthcare</p>
            <div className="flex space-x-4 mt-4">
              <span className="px-3 py-1 bg-light-gray-green rounded-full text-sm">📍 Location</span>
              <span className="px-3 py-1 bg-light-gray-green rounded-full text-sm">🏢 Company Size</span>
              <span className="px-3 py-1 bg-light-gray-green rounded-full text-sm">📅 Joined since</span>
            </div>

            {/* About Section */}
            <h2 className="text-xl font-semibold mt-6">About</h2>
            <p className="text-sm mt-2 text-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere metus
              tincidunt laoreet ullamcorper. Nulla eget mi justo. Sed eu aliquet magna. Donec
              auctor dictum felis in luctus. Nullam sed varius nunc, id ultrices metus.
            </p>
          </div>

          {/* Actions */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <div className="flex flex-col space-y-4">
              <button className="bg-light-gray-green text-dark-green px-6 py-2 rounded-full">
                Apply
              </button>
              <button className="border border-gray px-6 py-2 rounded-full">
                Message
              </button>
            </div>
            <div className="border mt-8 p-4 rounded">
              <h3 className="text-lg font-semibold">Want to find your perfect placement?</h3>
              <p className="text-sm mt-2">
                Discover tailored opportunities that match your skills and goals. Take the first
                step toward your dream career today!
              </p>
              <a
                href="#"
                className="text-dark-green font-medium mt-4 inline-block"
              >
                – Find your next placement
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StartupProfile;
