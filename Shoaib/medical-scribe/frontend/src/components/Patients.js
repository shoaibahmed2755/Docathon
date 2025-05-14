import React, { useState, useEffect } from "react";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="border p-2 rounded"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            + NEW PATIENT
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>NAME</th>
              <th>AGE</th>
              <th>MEDICAL HISTORY</th>
              <th>LAST VISIT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <span className="inline-block w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-2">
                    {patient.name[0]}
                  </span>
                  {patient.name} ({patient.gender})
                </td>
                <td>{patient.age}</td>
                <td>{patient.medicalHistory}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <button className="mr-2">🎙️</button>
                  <button>👤</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
