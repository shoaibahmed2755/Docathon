import { useState, useEffect } from "react";
import axios from "axios";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    gender: "",
    age: "",
    medicalHistory: "",
    lastVisit: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const loadPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/patients");
      setPatients(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load patients");
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const createPatient = async () => {
    if (
      !newPatient.name ||
      !newPatient.gender ||
      !newPatient.age ||
      !newPatient.medicalHistory ||
      !newPatient.lastVisit
    ) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/patients", {
        ...newPatient,
        age: parseInt(newPatient.age),
      });
      setNewPatient({
        name: "",
        gender: "",
        age: "",
        medicalHistory: "",
        lastVisit: "",
      });
      loadPatients();
      setError("");
    } catch (err) {
      setError("Failed to create patient");
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/patients/${id}`);
      loadPatients();
    } catch (err) {
      setError("Failed to delete patient");
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <div className="bg-white p-4 rounded-md shadow">
        <h3 className="text-lg font-bold mb-4">Add New Patient</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPatient.name}
              onChange={(e) =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Gender</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPatient.gender}
              onChange={(e) =>
                setNewPatient({ ...newPatient, gender: e.target.value })
              }
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm">Age</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPatient.age}
              onChange={(e) =>
                setNewPatient({ ...newPatient, age: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Medical History</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPatient.medicalHistory}
              onChange={(e) =>
                setNewPatient({ ...newPatient, medicalHistory: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">
              Last Visit (e.g., 18/5/2023)
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPatient.lastVisit}
              onChange={(e) =>
                setNewPatient({ ...newPatient, lastVisit: e.target.value })
              }
            />
          </div>
        </div>
        <button
          onClick={createPatient}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Patient
        </button>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="p-3 text-left font-bold">NAME</th>
              <th className="p-3 text-left font-bold">AGE</th>
              <th className="p-3 text-left font-bold">MEDICAL HISTORY</th>
              <th className="p-3 text-left font-bold">LAST VISIT</th>
              <th className="p-3 text-left font-bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-t">
                <td className="p-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full mr-2">
                    {patient.name[0]}
                  </span>
                  {patient.name} ({patient.gender})
                </td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3">{patient.medicalHistory}</td>
                <td className="p-3">{patient.lastVisit}</td>
                <td className="p-3">
                  <button className="mr-2">🎙️</button>
                  <button
                    className="mr-2"
                    onClick={() => alert("Viewing profile...")}
                  >
                    👤
                  </button>
                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Patients;
