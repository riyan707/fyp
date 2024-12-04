import Navbar from "./components/navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        {/* Rest of your page content */}
        <h1 className="text-3xl font-bold">Welcome to the Homepage!</h1>
      </main>
    </div>
  );
};

export default HomePage;
