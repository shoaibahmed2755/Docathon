import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import AIScribe from "./components/AIScribe";
import Templates from "./components/Templates";
import "./styles.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Patients":
        return <Patients />;
      case "AIScribe":
        return <AIScribe />;
      case "Templates":
        return <Templates />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="flex-1 p-6 overflow-auto">{renderPage()}</div>
    </div>
  );
};

export default App;
