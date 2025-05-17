import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import AIScribe from "./components/AIScribe";
import Templates from "./components/Templates";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar navigate={navigate} />
      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard navigate={navigate} />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/ai-scribe" element={<AIScribe navigate={navigate} />} />
          <Route path="/templates" element={<Templates />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
