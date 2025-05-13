from sqlalchemy.orm import Session
from models.appointment import Appointment
from schemas.appointment import AppointmentCreate

def create_appointment(db: Session, appointment: AppointmentCreate):
    db_appointment = Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def get_appointment(db: Session, appointment_id: str):
    return db.query(Appointment).filter(Appointment.id == appointment_id).first()

def get_all_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Appointment).offset(skip).limit(limit).all()

def delete_appointment(db: Session, appointment_id: str):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        return None
    db.delete(appointment)
    db.commit()
    return appointment
