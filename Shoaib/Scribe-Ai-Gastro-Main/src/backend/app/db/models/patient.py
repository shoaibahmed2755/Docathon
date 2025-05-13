from sqlalchemy import Column, String, Integer, Float, DateTime
from sqlalchemy.orm import relationship
from app.database.session import Base
from datetime import datetime

class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    contact_number = Column(String)
    email = Column(String)
    medical_history = Column(String)
    allergies = Column(String)  # You can store as comma-separated or use a separate table
    bmi = Column(Float)
    weight = Column(Float)
    height = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_visit = Column(DateTime)
