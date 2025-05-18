import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ navigate }) {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    time: "",
    purpose: "",
  });
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [patientsRes, appointmentsRes, notesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/patients"),
        axios.get("http://localhost:3000/api/appointments"),
        axios.get("http://localhost:3000/api/consultation_notes"),
      ]);
      setPatients(patientsRes.data);
      setAppointments(appointmentsRes.data);
      setNotes(notesRes.data);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createAppointment = async () => {
    if (
      !newAppointment.name ||
      !newAppointment.time ||
      !newAppointment.purpose
    ) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/appointments",
        newAppointment
      );
      setNewAppointment({ name: "", time: "", purpose: "" });
      loadData();
    } catch (err) {
      setError("Failed to create appointment");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/appointments/${id}`);
      loadData();
    } catch (err) {
      setError("Failed to delete appointment");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-sm text-gray-500">TOTAL PATIENTS</h3>
          <p className="text-2xl font-bold">{patients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-sm text-gray-500">APPOINTMENTS TODAY</h3>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-sm text-gray-500">SAVED TIME</h3>
          <p className="text-2xl font-bold">6hrs</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-sm text-gray-500">TOTAL NOTES</h3>
          <p className="text-2xl font-bold">{notes.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Create Appointment</h3>
          <div>
            <label className="block mb-2 text-sm">Patient</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newAppointment.name}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, name: e.target.value })
              }
            >
              <option value="">Select patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>
            <label className="block mb-2 text-sm">Time</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, time: e.target.value })
              }
              placeholder="e.g., 09:30 am"
            />
            <label className="block mb-2 text-sm">Purpose</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={newAppointment.purpose}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  purpose: e.target.value,
                })
              }
              placeholder="e.g., Follow-up"
            />
            <button
              onClick={createAppointment}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Create Appointment
            </button>
          </div>
          <h3 className="text-lg font-bold mt-6 mb-4">Today's Appointments</h3>
          <div>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full mr-2">
                    {appointment.name[0]}
                  </span>
                  {appointment.name} - {appointment.time} -{" "}
                  {appointment.purpose}
                </div>
                <div>
                  <button
                    onClick={() => navigate("/ai-scribe")}
                    className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                  >
                    Start Scribe
                  </button>
                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <p>Consultation completed - 10:30 AM</p>
          <p>Priya Sharma - Yesterday</p>
          <p>Recording uploaded - Yesterday</p>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Dashboard;
