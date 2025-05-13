from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PatientBase(BaseModel):
    name: str
    age: Optional[int]
    gender: Optional[str]
    contact_number: Optional[str]
    email: Optional[str]
    medical_history: Optional[str]
    allergies: Optional[str]
    bmi: Optional[float]
    weight: Optional[float]
    height: Optional[float]
    last_visit: Optional[datetime]

class PatientCreate(PatientBase):
    id: str

class PatientUpdate(PatientBase):
    pass

class PatientOut(PatientBase):
    id: str
    created_at: Optional[datetime]

    class Config:
        orm_mode = True
