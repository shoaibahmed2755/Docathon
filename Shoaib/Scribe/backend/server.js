const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize SQLite database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    medicalHistory TEXT NOT NULL,
    lastVisit TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    time TEXT NOT NULL,
    purpose TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS consultation_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientId INTEGER NOT NULL,
    patientName TEXT NOT NULL,
    transcribedText TEXT NOT NULL,
    chiefComplaint TEXT,
    history TEXT,
    examination TEXT,
    diagnosis TEXT,
    plan TEXT,
    summary TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (patientId) REFERENCES patients(id)
  )`);

  // Seed initial data
  db.get('SELECT COUNT(*) as count FROM patients', (err, row) => {
    if (row.count === 0) {
      const patients = [
        ['Sunita Kapoor', 'female', 48, 'Obesity, Sleep Apnea', '18/5/2023'],
        ['Arjun Patel', 'male', 56, 'GERD, Hypertension', '15/5/2023'],
        ['Priya Sharma', 'female', 30, 'IBS, Anxiety', '10/5/2023'],
        ['Nitin Gupta', 'male', 29, 'Crohn’s disease', '2/5/2023'],
        ['Rahul Mehta', 'male', 42, 'Fatty liver, Type 2 diabetes', '22/4/2023']
      ];
      const stmt = db.prepare('INSERT INTO patients (name, gender, age, medicalHistory, lastVisit) VALUES (?, ?, ?, ?, ?)');
      patients.forEach(patient => stmt.run(patient));
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM appointments', (err, row) => {
    if (row.count === 0) {
      const appointments = [
        ['Rahul Mehta', '09:30 am', 'Follow-up on fatty liver treatment'],
        ['Priya Sharma', '10:15 am', 'IBS symptoms worsening'],
        ['Arjun Patel', '11:00 am', 'Annual checkup'],
        ['Sunita Kapoor', '01:45 pm', 'Weight management consultation'],
        ['Nitin Gupta', '02:30 pm', 'Crohn’s flare-up']
      ];
      const stmt = db.prepare('INSERT INTO appointments (name, time, purpose) VALUES (?, ?, ?)');
      appointments.forEach(appointment => stmt.run(appointment));
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM templates', (err, row) => {
    if (row.count === 0) {
      const templates = [
        ['GERD INITIAL CONSULT', 'GI', 'Patient presents with symptoms of heartburn, regurgitation, and chest pain.'],
        ['OBESITY MANAGEMENT PLAN', 'Obesity', 'Patient presents for obesity management.'],
        ['IBS Assessment', 'GI', 'Patient presents with abdominal pain, altered bowel habits.'],
        ['Colonoscopy Report', 'Procedure', 'Patient presents for screening colonoscopy.']
      ];
      const stmt = db.prepare('INSERT INTO templates (name, category, content) VALUES (?, ?, ?)');
      templates.forEach(template => stmt.run(template));
      stmt.finalize();
    }
  });
});

// API Endpoints for Patients
app.get('/api/patients', (req, res) => {
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/patients', (req, res) => {
  const { name, gender, age, medicalHistory, lastVisit } = req.body;
  if (!name || !gender || !age || !medicalHistory || !lastVisit) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.run('INSERT INTO patients (name, gender, age, medicalHistory, lastVisit) VALUES (?, ?, ?, ?, ?)',
    [name, gender, age, medicalHistory, lastVisit], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM patients WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Patient deleted' });
  });
});

// API Endpoints for Appointments
app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM appointments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/appointments', (req, res) => {
  const { name, time, purpose } = req.body;
  if (!name || !time || !purpose) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.run('INSERT INTO appointments (name, time, purpose) VALUES (?, ?, ?)',
    [name, time, purpose], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM appointments WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment deleted' });
  });
});

// API Endpoints for Templates
app.get('/api/templates', (req, res) => {
  db.all('SELECT * FROM templates', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/templates', (req, res) => {
  const { name, category, content } = req.body;
  if (!name || !category || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.run('INSERT INTO templates (name, category, content) VALUES (?, ?, ?)',
    [name, category, content], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.delete('/api/templates/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM templates WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Template deleted' });
  });
});

// API Endpoint for AI Scribe (Save Consultation Note)
app.post('/api/scribe', (req, res) => {
  const { patientId, patientName, transcribedText, chiefComplaint, history, examination, diagnosis, plan, summary } = req.body;
  if (!patientId || !patientName || !transcribedText) {
    return res.status(400).json({ error: 'Patient ID, patient name, and transcribed text are required' });
  }

  const createdAt = new Date().toISOString();
  db.run(`INSERT INTO consultation_notes (patientId, patientName, transcribedText, chiefComplaint, history, examination, diagnosis, plan, summary, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [patientId, patientName, transcribedText, chiefComplaint || '', history || '', examination || '', diagnosis || '', plan || '', summary || '', createdAt],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Consultation note saved' });
    });
});

app.get('/api/consultation_notes', (req, res) => {
  db.all('SELECT * FROM consultation_notes ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});