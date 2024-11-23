import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AlignJustify } from 'lucide-react';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState(""); // Create state for search term
  
  // Handle the change event for the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit or action (e.g., log the search term)
  const handleSearch = () => {
    console.log("Search Term:", searchTerm); // You can replace this with your actual search logic
  };

  useGSAP(() => {
    gsap.from('.good', {
      y: -300,
      opacity: 0,
      duration: 0.8,
      delay: 1,
      stagger: 0.3,
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

      {/* Links (Hidden on smaller screens, toggled via a menu icon) */}
      <div className="hidden md:flex justify-between gap-5 items-center">
        <h4 className="good text-[#fff] text-3xl md:text-2xl">
          Projects <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <h4 className="good text-[#fff] text-3xl md:text-2xl">
          Groups <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <h4 className="good text-[#fff] text-3xl md:text-2xl">
          Products <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <h4 className="good text-[#fff] text-3xl md:text-2xl">
          More <i className="ri-arrow-down-s-fill"></i>
        </h4>
        <button className="good text-[#8D80D1] bg-[#4F46E5] text-3xl md:text-2xl px-6 py-2 rounded-md">
          Learn
        </button>
      </div>

      {/* Search and Profile */}
      <div className="flex justify-center items-center gap-4 lg:gap-8 mt-4 lg:mt-0">
        <input
          className="hidden md:flex good w-full lg:w-80 h-9 rounded-lg p-3"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange} // Track the input
          placeholder="Search"
        />
        <button
          onClick={handleSearch} // Trigger search action (could be filtering or making an API call)
          className="hidden md:flex good text-[#fff] bg-[#4F46E5] text-lg px-6 py-2 rounded-lg"
        >
          Search
        </button>
        <img
          className="good h-10 w-10 lg:h-12 lg:w-12 rounded-full"
          src="/profile_15232242.png"
          alt="Profile"
        />

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
