from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from data import patients, appointments, templates

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Patient(BaseModel):
    name: str
    gender: str
    age: int
    medicalHistory: str
    lastVisit: str

class Appointment(BaseModel):
    name: str
    time: str
    purpose: str

class Template(BaseModel):
    name: str
    category: str
    content: str

class ScribeInput(BaseModel):
    audio_text: str

class ConsultationNote(BaseModel):
    chief_complaint: str
    history: str
    examination: str
    diagnosis: str
    plan: str
    summary: str

# CRUD for Patients
@app.get("/api/patients")
async def get_patients():
    return patients

@app.post("/api/patients")
async def create_patient(patient: Patient):
    new_patient = patient.dict()
    new_patient["id"] = max([p["id"] for p in patients]) + 1 if patients else 1
    patients.append(new_patient)
    return new_patient

@app.delete("/api/patients/{patient_id}")
async def delete_patient(patient_id: int):
    for i, patient in enumerate(patients):
        if patient["id"] == patient_id:
            patients.pop(i)
            return {"message": "Patient deleted"}
    raise HTTPException(status_code=404, detail="Patient not found")

# CRUD for Appointments
@app.get("/api/appointments")
async def get_appointments():
    return appointments

@app.post("/api/appointments")
async def create_appointment(appointment: Appointment):
    new_appointment = appointment.dict()
    new_appointment["id"] = max([a["id"] for a in appointments]) + 1 if appointments else 1
    appointments.append(new_appointment)
    return new_appointment

@app.delete("/api/appointments/{appointment_id}")
async def delete_appointment(appointment_id: int):
    for i, appointment in enumerate(appointments):
        if appointment["id"] == appointment_id:
            appointments.pop(i)
            return {"message": "Appointment deleted"}
    raise HTTPException(status_code=404, detail="Appointment not found")

# CRUD for Templates
@app.get("/api/templates")
async def get_templates():
    return templates

@app.post("/api/templates")
async def create_template(template: Template):
    new_template = template.dict()
    new_template["id"] = max([t["id"] for t in templates]) + 1 if templates else 1
    templates.append(new_template)
    return new_template

@app.delete("/api/templates/{template_id}")
async def delete_template(template_id: int):
    for i, template in enumerate(templates):
        if template["id"] == template_id:
            templates.pop(i)
            return {"message": "Template deleted"}
    raise HTTPException(status_code=404, detail="Template not found")

# AI Scribe Endpoint
@app.post("/api/scribe", response_model=ConsultationNote)
async def process_scribe(input: ScribeInput):
    transcribed_text = input.audio_text
    chief_complaint = transcribed_text if "complaint" in transcribed_text.lower() else "Patient presents with unspecified symptoms."
    history = "Patient reports a history of similar symptoms for 2 weeks." if "history" in transcribed_text.lower() else "No significant history reported."
    examination = "Normal findings on examination." if "examination" in transcribed_text.lower() else "Not specified."
    diagnosis = "Possible diagnosis based on symptoms." if "diagnosis" in transcribed_text.lower() else "Under evaluation."
    plan = "Follow-up in 1 week, symptomatic treatment advised." if "plan" in transcribed_text.lower() else "No specific plan provided."
    summary = f"Patient presented with {chief_complaint.lower()}. History: {history.lower()} Examination: {examination.lower()} Diagnosis: {diagnosis.lower()} Plan: {plan.lower()}"
    return ConsultationNote(
        chief_complaint=chief_complaint,
        history=history,
        examination=examination,
        diagnosis=diagnosis,
        plan=plan,
        summary=summary
    )