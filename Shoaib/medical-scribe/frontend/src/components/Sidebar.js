import React from "react";

const Sidebar = ({ setCurrentPage, currentPage }) => {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "AIScribe", icon: "🎙️" },
    { name: "Patients", icon: "👥" },
    { name: "Templates", icon: "📋" },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full p-4">
      <div className="flex items-center mb-6">
        <span className="text-red-500 font-bold">MediScribe</span>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPage(item.name)}
            className={`flex items-center w-full p-2 mb-2 rounded ${
              currentPage === item.name
                ? "bg-green-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="w-full p-2 bg-gray-100 rounded hover:bg-gray-200">
          NEED HELP? CHECK OUR DOCUMENTATION OR CONTACT SUPPORT
        </button>
        <button className="w-full p-2 mt-2 bg-gray-100 rounded hover:bg-gray-200">
          VIEW DOCS
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
