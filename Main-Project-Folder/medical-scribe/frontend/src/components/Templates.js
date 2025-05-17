import { useState, useEffect } from "react";
import axios from "axios";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    content: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const loadTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/templates");
      setTemplates(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load templates");
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const createTemplate = async () => {
    if (!newTemplate.name || !newTemplate.category || !newTemplate.content) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/templates", newTemplate);
      setNewTemplate({ name: "", category: "", content: "" });
      loadTemplates();
      setError("");
    } catch (err) {
      setError("Failed to create template");
    }
  };

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/templates/${id}`);
      loadTemplates();
    } catch (err) {
      setError("Failed to delete template");
    }
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Templates</h2>
      <div className="bg-white p-4 rounded-md shadow">
        <h3 className="text-lg font-bold mb-4">Create Template</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Category</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newTemplate.category}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, category: e.target.value })
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2 text-sm">Content</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md h-32"
              value={newTemplate.content}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, content: e.target.value })
              }
            />
          </div>
        </div>
        <button
          onClick={createTemplate}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create Template
        </button>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-gray-100 p-4 rounded-md">
              <h4 className="font-bold mb-2">{template.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{template.category}</p>
              <p>{template.content}</p>
              <div className="mt-2 flex gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  PREVIEW
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  USE
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Templates;
