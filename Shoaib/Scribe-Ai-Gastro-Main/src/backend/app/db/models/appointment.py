from sqlalchemy import Column, String, DateTime, ForeignKey
from app.database.session import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"))
    patient_name = Column(String)
    date = Column(DateTime)
    status = Column(String)
    reason = Column(String)
