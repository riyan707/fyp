import Navbar from "../components/navbar";

const Dashboard = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main className="px-[100px] py-8">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <p className="mt-4 text-gray">Welcome to your dashboard!</p>
      </main>
    </div>
  );
};

export default Dashboard;
