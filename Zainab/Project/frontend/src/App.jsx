import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientForm from "./pages/PatientForm";
import Scribe from "./pages/Scribe";
import VisitHistory from "./pages/VisitHistory";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-patient" element={<PatientForm />} />
                <Route path="/scribe/:id" element={<Scribe />} />
                <Route path="/history/:id" element={<VisitHistory />} />
            </Routes>
        </Router>
    );
}

export default App;