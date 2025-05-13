from sqlalchemy import Column, String, Text
from app.database.session import Base

class Template(Base):
    __tablename__ = "templates"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    content = Column(Text)  # JSON stored as string
    created_by = Column(String)
    is_favorite = Column(String)  # You can use Boolean if you prefer
