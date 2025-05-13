from sqlalchemy.orm import Session
from models.patient import Patient
from schemas.patient import PatientCreate, PatientUpdate
from uuid import uuid4

def create_patient(db: Session, patient: PatientCreate):
    db_patient = Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patient(db: Session, patient_id: str):
    return db.query(Patient).filter(Patient.id == patient_id).first()

def get_all_patients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Patient).offset(skip).limit(limit).all()

def update_patient(db: Session, patient_id: str, updates: PatientUpdate):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        return None
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(patient, key, value)
    db.commit()
    db.refresh(patient)
    return patient

def delete_patient(db: Session, patient_id: str):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        return None
    db.delete(patient)
    db.commit()
    return patient
