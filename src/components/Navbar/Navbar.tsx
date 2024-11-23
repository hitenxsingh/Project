import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AlignJustify } from 'lucide-react';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown toggle state

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search Term:", searchTerm);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  useGSAP(() => {
    gsap.from('.good', {
      y: -300,
      opacity: 0,
      duration: 0.6,
      delay: 1,
      stagger: 0.2,
    });
  });

  return (
    <div className="flex flex-wrap justify-between items-center min-w-full p-5 bg-[#111827]">
      {/* Logo and Brand */}
      <div className="flex justify-center gap-2 items-center">
        <img
          className="good h-12"
          src="/icons8-outriders-logo-64.png"
          alt="Logo"
        />
        <h4 className="good text-[#8D80D1] font-bold text-2xl">PRODIGY</h4>
      </div>

      {/* Links */}
      <div className="hidden md:flex justify-between gap-14 items-center">
        <h4 className="good text-[#fff] text-3xl md:text-2xl cursor-pointer">
          Projects <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <h4 className="good text-[#fff] text-3xl md:text-2xl cursor-pointer">
          Groups <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <h4 className="good text-[#fff] text-3xl md:text-2xl cursor-pointer">
          Products <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <h4 className="good text-[#fff] text-3xl md:text-2xl cursor-pointer">
          More <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <button className="good text-[#8D80D1] bg-[#4F46E5] text-3xl md:text-2xl px-6 py-2 rounded-md cursor-pointer">
          Learn
        </button>
      </div>

      {/* Search and Profile */}
      <div className="flex justify-center items-center gap-4 lg:gap-8 mt-4 lg:mt-0 relative">
        <input
          className="hidden md:flex good w-full lg:w-80 h-9 rounded-lg p-3"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        <button
          onClick={handleSearch}
          className="hidden md:flex good text-[#fff] bg-[#4F46E5] text-lg px-6 py-2 rounded-lg"
        >
          Search
        </button>
        <div className="relative">
          <img
            className="good h-10 w-10 lg:h-12 lg:w-12 rounded-full cursor-pointer"
            src="/profile_15232242.png"
            alt="Profile"
            onClick={toggleDropdown} // Toggle dropdown on click
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50">
              <p className="text-gray-700 font-semibold">John Doe</p>
              <p className="text-gray-500 text-sm">johndoe@example.com</p>
              <hr className="my-2" />
              <button
                className="w-full text-left text-gray-700 hover:text-gray-900"
                onClick={() => console.log("View Profile")}
              >
                View Profile
              </button>
              <button
                className="w-full text-left text-gray-700 hover:text-gray-900 mt-2"
                onClick={() => console.log("Logout")}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-[#fff] text-3xl"
            onClick={() => console.log("Toggle Menu")}
          >
            <AlignJustify />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
