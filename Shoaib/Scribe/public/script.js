// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  document.querySelector(`button[onclick="showPage('${pageId}')"]`).classList.add('active');

  if (pageId === 'dashboard') loadDashboard();
  if (pageId === 'patients') loadPatients();
  if (pageId === 'ai-scribe') loadAIScribe();
  if (pageId === 'templates') loadTemplates();
}

// Load Dashboard
async function loadDashboard() {
  try {
    const [patientsRes, appointmentsRes] = await Promise.all([
      fetch('http://localhost:3000/api/patients'),
      fetch('http://localhost:3000/api/appointments')
    ]);
    const patients = await patientsRes.json();
    const appointments = await appointmentsRes.json();

    // Update stats
    document.getElementById('total-patients').textContent = patients.length;
    document.getElementById('appointments-today').textContent = appointments.length;

    // Populate appointment patient dropdown
    const appointmentPatientSelect = document.getElementById('appointment-patient');
    appointmentPatientSelect.innerHTML = '<option value="">Select patient</option>';
    patients.forEach(patient => {
      const option = document.createElement('option');
      option.value = patient.name;
      option.textContent = patient.name;
      appointmentPatientSelect.appendChild(option);
    });

    // Populate appointments list
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';
    appointments.forEach(appointment => {
      const div = document.createElement('div');
      div.className = 'appointment-item';
      div.innerHTML = `
        <div>
          <span class="initial-circle">${appointment.name[0]}</span>
          ${appointment.name} - ${appointment.time} - ${appointment.purpose}
        </div>
        <div>
          <button class="secondary" onclick="alert('Starting scribe...')">Start Scribe</button>
          <button class="delete" onclick="deleteAppointment(${appointment.id})">Delete</button>
        </div>
      `;
      appointmentsList.appendChild(div);
    });

    document.getElementById('dashboard-error').textContent = '';
  } catch (err) {
    document.getElementById('dashboard-error').textContent = 'Failed to load dashboard data';
  }
}

// Create Appointment
async function createAppointment() {
  const name = document.getElementById('appointment-patient').value;
  const time = document.getElementById('appointment-time').value;
  const purpose = document.getElementById('appointment-purpose').value;

  if (!name || !time || !purpose) {
    document.getElementById('dashboard-error').textContent = 'All fields are required';
    return;
  }

  try {
    await fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, time, purpose })
    });
    document.getElementById('appointment-patient').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('appointment-purpose').value = '';
    loadDashboard();
  } catch (err) {
    document.getElementById('dashboard-error').textContent = 'Failed to create appointment';
  }
}

// Delete Appointment
async function deleteAppointment(id) {
  try {
    await fetch(`http://localhost:3000/api/appointments/${id}`, {
      method: 'DELETE'
    });
    loadDashboard();
  } catch (err) {
    document.getElementById('dashboard-error').textContent = 'Failed to delete appointment';
  }
}

// Load Patients
async function loadPatients() {
  try {
    const patients = await (await fetch('http://localhost:3000/api/patients')).json();

    const patientsList = document.getElementById('patients-list');
    patientsList.innerHTML = '';
    patients.forEach(patient => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <span class="initial-circle">${patient.name[0]}</span>
          ${patient.name} (${patient.gender})
        </td>
        <td>${patient.age}</td>
        <td>${patient.medicalHistory}</td>
        <td>${patient.lastVisit}</td>
        <td>
          <button onclick="alert('Starting scribe...')">🎙️</button>
          <button onclick="alert('Viewing profile...')">👤</button>
          <button class="delete" onclick="deletePatient(${patient.id})">Delete</button>
        </td>
      `;
      patientsList.appendChild(tr);
    });

    document.getElementById('patients-error').textContent = '';
  } catch (err) {
    document.getElementById('patients-error').textContent = 'Failed to load patients';
  }
}

// Search Patients
function searchPatients() {
  const searchTerm = document.getElementById('patient-search').value.toLowerCase();
  const rows = document.querySelectorAll('#patients-list tr');
  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    row.style.display = name.includes(searchTerm) ? '' : 'none';
  });
}

// Create Patient
async function createPatient() {
  const name = document.getElementById('patient-name').value;
  const gender = document.getElementById('patient-gender').value;
  const age = document.getElementById('patient-age').value;
  const medicalHistory = document.getElementById('patient-medical-history').value;
  const lastVisit = document.getElementById('patient-last-visit').value;

  if (!name || !gender || !age || !medicalHistory || !lastVisit) {
    document.getElementById('patients-error').textContent = 'All fields are required';
    return;
  }

  try {
    await fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, gender, age: parseInt(age), medicalHistory, lastVisit })
    });
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-gender').value = '';
    document.getElementById('patient-age').value = '';
    document.getElementById('patient-medical-history').value = '';
    document.getElementById('patient-last-visit').value = '';
    loadPatients();
  } catch (err) {
    document.getElementById('patients-error').textContent = 'Failed to create patient';
  }
}

// Delete Patient
async function deletePatient(id) {
  try {
    await fetch(`http://localhost:3000/api/patients/${id}`, {
      method: 'DELETE'
    });
    loadPatients();
  } catch (err) {
    document.getElementById('patients-error').textContent = 'Failed to delete patient';
  }
}

// Load AI Scribe
async function loadAIScribe() {
  try {
    const patients = await (await fetch('http://localhost:3000/api/patients')).json();

    const scribePatientSelect = document.getElementById('scribe-patient');
    scribePatientSelect.innerHTML = '<option value="">Select patient</option>';
    patients.forEach(patient => {
      const option = document.createElement('option');
      option.value = patient.name;
      option.textContent = patient.name;
      scribePatientSelect.appendChild(option);
    });

    document.getElementById('scribe-error').textContent = '';
  } catch (err) {
    document.getElementById('scribe-error').textContent = 'Failed to load patients';
  }
}

// Process AI Scribe
async function processScribe() {
  const audioText = document.getElementById('scribe-input').value;
  if (!audioText) {
    document.getElementById('scribe-error').textContent = 'Input is required';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/scribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio_text: audioText })
    });
    const note = await response.json();
    document.getElementById('scribe-chief-complaint').value = note.chief_complaint;
    document.getElementById('scribe-history').value = note.history;
    document.getElementById('scribe-examination').value = note.examination;
    document.getElementById('scribe-diagnosis').value = note.diagnosis;
    document.getElementById('scribe-plan').value = note.plan;
    document.getElementById('scribe-summary').value = note.summary;
    document.getElementById('scribe-error').textContent = '';
  } catch (err) {
    document.getElementById('scribe-error').textContent = 'Failed to process scribe';
  }
}

// Load Templates
async function loadTemplates() {
  try {
    const templates = await (await fetch('http://localhost:3000/api/templates')).json();

    const templatesList = document.getElementById('templates-list');
    templatesList.innerHTML = '';
    templates.forEach(template => {
      const div = document.createElement('div');
      div.className = 'template-card';
      div.innerHTML = `
        <h4>${template.name}</h4>
        <p class="category">${template.category}</p>
        <p>${template.content}</p>
        <div class="actions">
          <button class="secondary">PREVIEW</button>
          <button class="secondary">USE</button>
          <button class="delete" onclick="deleteTemplate(${template.id})">Delete</button>
        </div>
      `;
      templatesList.appendChild(div);
    });

    document.getElementById('templates-error').textContent = '';
  } catch (err) {
    document.getElementById('templates-error').textContent = 'Failed to load templates';
  }
}

// Search Templates
function searchTemplates() {
  const searchTerm = document.getElementById('template-search').value.toLowerCase();
  const cards = document.querySelectorAll('.template-card');
  cards.forEach(card => {
    const name = card.querySelector('h4').textContent.toLowerCase();
    card.style.display = name.includes(searchTerm) ? '' : 'none';
  });
}

// Create Template
async function createTemplate() {
  const name = document.getElementById('template-name').value;
  const category = document.getElementById('template-category').value;
  const content = document.getElementById('template-content').value;

  if (!name || !category || !content) {
    document.getElementById('templates-error').textContent = 'All fields are required';
    return;
  }

  try {
    await fetch('http://localhost:3000/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, content })
    });
    document.getElementById('template-name').value = '';
    document.getElementById('template-category').value = '';
    document.getElementById('template-content').value = '';
    loadTemplates();
  } catch (err) {
    document.getElementById('templates-error').textContent = 'Failed to create template';
  }
}

// Delete Template
async function deleteTemplate(id) {
  try {
    await fetch(`http://localhost:3000/api/templates/${id}`, {
      method: 'DELETE'
    });
    loadTemplates();
  } catch (err) {
    document.getElementById('templates-error').textContent = 'Failed to delete template';
  }
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
});