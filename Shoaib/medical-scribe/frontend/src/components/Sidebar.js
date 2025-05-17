function Sidebar({ navigate }) {
  return (
    <div className="w-64 bg-white p-6 shadow-md h-full sticky top-0">
      <h1 className="text-lg font-bold text-red-500 mb-6">MediScribe</h1>
      <nav>
        <button
          onClick={() => navigate("/")}
          className="flex items-center w-full p-2 mb-2 rounded-md hover:bg-gray-200"
        >
          <span className="mr-2">🏠</span> Dashboard
        </button>
        <button
          onClick={() => navigate("/ai-scribe")}
          className="flex items-center w-full p-2 mb-2 rounded-md hover:bg-gray-200"
        >
          <span className="mr-2">🎙️</span> AI Scribe
        </button>
        <button
          onClick={() => navigate("/patients")}
          className="flex items-center w-full p-2 mb-2 rounded-md hover:bg-gray-200"
        >
          <span className="mr-2">👥</span> Patients
        </button>
        <button
          onClick={() => navigate("/templates")}
          className="flex items-center w-full p-2 mb-2 rounded-md hover:bg-gray-200"
        >
          <span className="mr-2">📋</span> Templates
        </button>
      </nav>
      <div className="mt-auto">
        <button className="w-full p-2 mb-2 bg-gray-100 rounded-md text-xs">
          NEED HELP? CHECK OUR DOCUMENTATION OR CONTACT SUPPORT
        </button>
        <button className="w-full p-2 bg-gray-100 rounded-md text-xs">
          VIEW DOCS
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
