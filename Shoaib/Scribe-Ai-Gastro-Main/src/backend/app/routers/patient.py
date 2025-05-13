from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.patient import PatientCreate, PatientOut, PatientUpdate
from crud import patient as crud_patient

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.post("/", response_model=PatientOut)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    return crud_patient.create_patient(db, patient)

@router.get("/{patient_id}", response_model=PatientOut)
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    db_patient = crud_patient.get_patient(db, patient_id)
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@router.get("/", response_model=list[PatientOut])
def get_all_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_patient.get_all_patients(db, skip, limit)

@router.put("/{patient_id}", response_model=PatientOut)
def update_patient(patient_id: str, updates: PatientUpdate, db: Session = Depends(get_db)):
    updated = crud_patient.update_patient(db, patient_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Patient not found")
    return updated

@router.delete("/{patient_id}", response_model=PatientOut)
def delete_patient(patient_id: str, db: Session = Depends(get_db)):
    deleted = crud_patient.delete_patient(db, patient_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Patient not found")
    return deleted
