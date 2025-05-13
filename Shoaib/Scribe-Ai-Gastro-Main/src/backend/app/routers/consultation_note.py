
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.consultation_note import (
    ConsultationNoteCreate,
    ConsultationNoteOut,
    ConsultationNoteUpdate,
)
from crud import consultation_note as crud_note

router = APIRouter(prefix="/consultation-notes", tags=["Consultation Notes"])

@router.post("/", response_model=ConsultationNoteOut)
def create_note(note: ConsultationNoteCreate, db: Session = Depends(get_db)):
    return crud_note.create_consultation_note(db, note)

@router.get("/{note_id}", response_model=ConsultationNoteOut)
def get_note(note_id: str, db: Session = Depends(get_db)):
    note = crud_note.get_consultation_note(db, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.get("/", response_model=list[ConsultationNoteOut])
def get_all_notes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_note.get_all_notes(db, skip, limit)

@router.put("/{note_id}", response_model=ConsultationNoteOut)
def update_note(note_id: str, updates: ConsultationNoteUpdate, db: Session = Depends(get_db)):
    updated = crud_note.update_consultation_note(db, note_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated

@router.delete("/{note_id}", response_model=ConsultationNoteOut)
def delete_note(note_id: str, db: Session = Depends(get_db)):
    deleted = crud_note.delete_consultation_note(db, note_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
    return deleted
