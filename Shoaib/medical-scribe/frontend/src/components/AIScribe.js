import React from "react";

const AIScribe = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Scribe</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Input Method</h2>
          <div className="flex mb-4">
            <button className="bg-gray-200 px-4 py-2 rounded mr-2">LIVE</button>
            <button className="bg-gray-200 px-4 py-2 rounded mr-2">
              UPLOAD
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded">MANUAL</button>
          </div>
          <div className="flex justify-center mb-4">
            <button className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center">
              🎙️
            </button>
          </div>
          <p className="text-center">Press to start recording</p>
          <p className="text-center text-gray-500">
            Speak clearly and the AI will transcribe and structure your
            consultation
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Consultation Note</h2>
          <div className="mb-4">
            <label className="block mb-2">Patient</label>
            <select className="border p-2 rounded w-full">
              <option>Select patient</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Chief Complaint</label>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Enter chief complaint"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">History of Present Illness</label>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Enter patient history"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Physical Examination</label>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Enter examination findings"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Assessment/Diagnosis</label>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Add diagnosis"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Plan</label>
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Enter treatment plan"
            ></textarea>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            SAVE NOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIScribe;
