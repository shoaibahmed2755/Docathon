from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.appointment import AppointmentCreate, AppointmentOut
from crud import appointment as crud_appointment

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("/", response_model=AppointmentOut)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    return crud_appointment.create_appointment(db, appointment)

@router.get("/{appointment_id}", response_model=AppointmentOut)
def get_appointment(appointment_id: str, db: Session = Depends(get_db)):
    appointment = crud_appointment.get_appointment(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@router.get("/", response_model=list[AppointmentOut])
def get_all_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_appointment.get_all_appointments(db, skip, limit)

@router.delete("/{appointment_id}", response_model=AppointmentOut)
def delete_appointment(appointment_id: str, db: Session = Depends(get_db)):
    deleted = crud_appointment.delete_appointment(db, appointment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return deleted

