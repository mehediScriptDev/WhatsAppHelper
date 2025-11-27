import { ChevronDown, Smartphone, Zap } from "lucide-react";
import React, { useState } from "react";

const WhatsappList = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const whatsappOptions = [
    { id: 1, label: "Add New WhatsApp", value: "new" },
    { id: 2, label: "Import WhatsApp", value: "import" },
    { id: 3, label: "Scan QR Code", value: "scan" },
  ];

  const handleOptionClick = (option) => {
    console.log("Selected:", option);
    setIsDropdownOpen(false);
    // Add your logic here
  };

  return (
    <div className="w-full bg-white font-sans text-black">
      <div className=" mx-auto p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side: Title and Subtitle */}
          <div>
            <h1 className="text-xl md:text-3xl font-medium text-[#000000]">WhatsApp List</h1>
            <p className="text-sm sm:text-base md:text-lg text-[#656565] mt-1">
              WhatsApp accounts registered to your profile
            </p>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex justify-center items-center shrink-0 gap-2 md:gap-3">
            {/* Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center gap-2 md:gap-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors w-40 md:w-44 md:px-4 "
              >
                Add WhatsApp
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  {/* Dropdown Options */}
                  <div className="absolute right-0 mt-1 w-40 md:w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    {whatsappOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-[#BD31CE] text-white rounded-lg shadow-sm text-sm font-medium "
            >
              {/* Reverted to the inline SVG component */}
              <Zap className="w-4 h-4" />
              Blast All
            </button>
          </div>
        </header>

        {/* Main Content: Empty State */}
        <main className="flex flex-col items-center justify-center text-center mt-24 md:mt-32">
          {/* Icon */}
          <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            {/* Reverted to the inline SVG component */}
            <Smartphone className="w-18 h-18 text-gray-400" />
          </div>

          {/* Empty State Text */}
          <h2 className="text-xl font-semibold text-[#000000] mb-2">
            No WhatsApp accounts yet
          </h2>
          <p className="text-sm sm:text-base text-[#656565]">
            Click + Add WhatsApp to add your first account.
          </p>
        </main>
      </div>
    </div>
  );
};

export default WhatsappList;
