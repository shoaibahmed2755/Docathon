from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from app.database.session import Base
from datetime import datetime

class ConsultationNote(Base):
    __tablename__ = "consultation_notes"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"))
    doctor_id = Column(String)
    date = Column(DateTime, default=datetime.utcnow)
    content = Column(Text)  # You can store JSON as string here
    tags = Column(String)
    status = Column(String)
