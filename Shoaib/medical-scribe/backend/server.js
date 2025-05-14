const express = require("express");
const cors = require("cors");
const { patients, appointments, templates } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/patients", (req, res) => {
  res.json(patients);
});

app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

app.get("/api/templates", (req, res) => {
  res.json(templates);
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
