from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AppointmentBase(BaseModel):
    patient_id: str
    patient_name: Optional[str]
    date: datetime
    status: Optional[str]
    reason: Optional[str]

class AppointmentCreate(AppointmentBase):
    id: str

class AppointmentOut(AppointmentBase):
    id: str

    class Config:
        orm_mode = True
