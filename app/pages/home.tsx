import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main className="px-[100px] py-8">
        <h1 className="text-4xl font-semibold">Welcome to the Home Page</h1>
        <p className="mt-4 text-gray">
          This is the homepage. You can navigate to other pages using the navbar.
        </p>
      </main>
    </div>
  );
};

export default Home;
