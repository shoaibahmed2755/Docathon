from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ConsultationNoteBase(BaseModel):
    patient_id: str
    doctor_id: Optional[str]
    content: str  # You can use `dict` if you store JSON
    tags: Optional[str]
    status: Optional[str]

class ConsultationNoteCreate(ConsultationNoteBase):
    id: str

class ConsultationNoteOut(ConsultationNoteBase):
    id: str
    date: Optional[datetime]

    class Config:
        orm_mode = True
