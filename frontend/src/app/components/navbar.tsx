import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-foreground text-gray-100 px-[100px] py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-2xl font-semibold">Logo</div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-sm">
        <Link href="/pages/home" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/pages/startup-profile" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link href="/pages/post-a-job" className="hover:text-gray-300">
          Post a Job
        </Link>
      </div>

      {/* Icons and Button */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="w-6 h-6 text-gray-100 hover:text-gray-300">
          <i className="fas fa-bell"></i>
        </button>

        {/* User Avatar */}
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />

        {/* Call-to-Action Button */}
        <button className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
          Find your next placement
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
