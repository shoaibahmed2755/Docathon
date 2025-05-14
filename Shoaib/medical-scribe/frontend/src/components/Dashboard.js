import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">TOTAL PATIENTS</h2>
          <p className="text-2xl font-bold">52</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">APPOINTMENTS TODAY</h2>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">SAVED TIME</h2>
          <p className="text-2xl font-bold">6hrs</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">TOTAL NOTES</h2>
          <p className="text-2xl font-bold">128</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <span className="inline-block w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-2">
                  {appointment.name[0]}
                </span>
                {appointment.name} - {appointment.time} - {appointment.purpose}
              </div>
              <button className="bg-green-500 text-white px-2 py-1 rounded">
                Start Scribe
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p>Consultation completed - 10:30 AM</p>
          <p>Priya Sharma - Yesterday</p>
          <p>Recording uploaded - Yesterday</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
