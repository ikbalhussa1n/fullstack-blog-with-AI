import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 flex items-center px-4 md:px-6 py-2 md:py-3 h-16 bg-white shadow-md dark:bg-gray-900">
      {/* Left: Logo */}

      <div className="flex items-center" onClick={() => navigate("/")}>
        <img src="./icon.svg" alt="Logo" width={40} />
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 w-fit md:mx-6 md:p-5 pl-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-3 md:px-4 py-1.5 md:py-2 text-sm rounded-full border  focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-800 dark:text-white dark:border-gray-700"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <a
          href="/dashboard"
          className="p-4 text-gray-700 font-medium text-sm md:text-base hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
        >
          <MdDashboardCustomize size={25} />
        </a>
        <button
          className="w-fit bg-green-600 text-white font-semibold text-sm sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow hover:bg-green-700 transition-colors"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
