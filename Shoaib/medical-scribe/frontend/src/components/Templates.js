import React, { useState, useEffect } from "react";

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Templates</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search templates..."
            className="border p-2 rounded"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            + CREATE TEMPLATE
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-gray-100 p-4 rounded">
              <h3 className="font-bold">{template.name}</h3>
              <p className="text-gray-500">{template.category}</p>
              <p>{template.content}</p>
              <div className="mt-2">
                <button className="bg-gray-200 px-2 py-1 rounded mr-2">
                  PREVIEW
                </button>
                <button className="bg-gray-200 px-2 py-1 rounded">USE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
