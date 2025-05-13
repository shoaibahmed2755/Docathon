from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    doctor,
    patient,
    consultation_note,
    template,
)

app = FastAPI(
    title="GI and Obesity Documentation AI Assistant",
    description="Backend API for managing doctors, patients, consultation notes, and templates.",
    version="1.0.0"
)

# CORS settings (adjust origins as needed for your frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(doctor.router)
app.include_router(patient.router)
app.include_router(consultation_note.router)
app.include_router(template.router)

@app.get("/")
def root():
    return {"message": "GI and Obesity AI Assistant Backend is running"}
