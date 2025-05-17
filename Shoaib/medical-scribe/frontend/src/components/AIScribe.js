import { useState, useEffect } from "react";
import axios from "axios";

function AIScribe({ navigate }) {
  const [patients, setPatients] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState({
    chiefComplaint: "",
    history: "",
    examination: "",
    diagnosis: "",
    plan: "",
    summary: "",
  });

  let mediaRecorder;
  let audioChunks = [];

  const loadData = async () => {
    try {
      const [patientsRes, notesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/patients"),
        axios.get("http://localhost:3000/api/consultation_notes"),
      ]);
      setPatients(patientsRes.data);
      setNotes(notesRes.data);
      setError("");
    } catch (err) {
      setError("Failed to load AI Scribe data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(",")[1];
          try {
            const response = await axios.post(
              "http://localhost:3000/api/speech-to-text",
              { audio: base64Audio }
            );
            setTranscribedText(response.data.transcription);
          } catch (err) {
            setError("Failed to transcribe audio");
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const processNote = async () => {
    if (!transcribedText) {
      setError("Transcribed text is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/nlp", {
        text: transcribedText,
      });
      setNote(response.data);
      setError("");
    } catch (err) {
      setError("Failed to process note");
    }
  };

  const saveNote = async () => {
    if (!selectedPatient || !transcribedText) {
      setError("Patient and transcribed text are required");
      return;
    }

    const patient = patients.find((p) => p.id === parseInt(selectedPatient));
    try {
      await axios.post("http://localhost:3000/api/scribe", {
        patientId: selectedPatient,
        patientName: patient.name,
        transcribedText,
        ...note,
      });
      alert("Consultation note saved successfully!");
      setTranscribedText("");
      setNote({
        chiefComplaint: "",
        history: "",
        examination: "",
        diagnosis: "",
        plan: "",
        summary: "",
      });
      setSelectedPatient("");
      loadData();
    } catch (err) {
      setError("Failed to save note");
    }
  };

  const viewNote = (note) => {
    setSelectedPatient(note.patientId);
    setTranscribedText(note.transcribedText);
    setNote({
      chiefComplaint: note.chiefComplaint || "",
      history: note.history || "",
      examination: note.examination || "",
      diagnosis: note.diagnosis || "",
      plan: note.plan || "",
      summary: note.summary || "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">AI Scribe</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Input Method</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className={`px-4 py-2 rounded-md ${
                isRecording ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              🎙️ Start Recording
            </button>
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className={`px-4 py-2 rounded-md ${
                !isRecording ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              ⏹️ Stop Recording
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              UPLOAD
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              MANUAL
            </button>
          </div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md h-32"
            placeholder="Transcribed speech will appear here..."
            value={transcribedText}
            onChange={(e) => setTranscribedText(e.target.value)}
          />
          <button
            onClick={processNote}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4"
          >
            Process
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-bold mb-4">Consultation Note</h3>
          <label className="block mb-2 text-sm">Patient</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Select patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          <label className="block mb-2 text-sm">Chief Complaint</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-20"
            value={note.chiefComplaint}
            readOnly
          />
          <label className="block mb-2 text-sm">
            History of Present Illness
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-20"
            value={note.history}
            readOnly
          />
          <label className="block mb-2 text-sm">Physical Examination</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-20"
            value={note.examination}
            readOnly
          />
          <label className="block mb-2 text-sm">Assessment/Diagnosis</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-20"
            value={note.diagnosis}
            readOnly
          />
          <label className="block mb-2 text-sm">Plan</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-20"
            value={note.plan}
            readOnly
          />
          <label className="block mb-2 text-sm">Summary</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-20"
            value={note.summary}
            readOnly
          />
          <button
            onClick={saveNote}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Note
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow mt-4">
        <h3 className="text-lg font-bold mb-4">Saved Consultation Notes</h3>
        <div>
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full mr-2">
                  {note.patientName[0]}
                </span>
                {note.patientName} - {new Date(note.createdAt).toLocaleString()}{" "}
                - {note.chiefComplaint || "Consultation note"}
              </div>
              <button
                onClick={() => viewNote(note)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AIScribe;
