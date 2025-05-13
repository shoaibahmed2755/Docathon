from sqlalchemy.orm import Session
from models.consultation_note import ConsultationNote
from schemas.consultation_note import ConsultationNoteCreate

def create_note(db: Session, note: ConsultationNoteCreate):
    db_note = ConsultationNote(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_note(db: Session, note_id: str):
    return db.query(ConsultationNote).filter(ConsultationNote.id == note_id).first()

def get_notes_by_patient(db: Session, patient_id: str):
    return db.query(ConsultationNote).filter(ConsultationNote.patient_id == patient_id).all()

def delete_note(db: Session, note_id: str):
    note = db.query(ConsultationNote).filter(ConsultationNote.id == note_id).first()
    if not note:
        return None
    db.delete(note)
    db.commit()
    return note
