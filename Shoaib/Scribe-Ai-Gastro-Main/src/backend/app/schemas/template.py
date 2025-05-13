from pydantic import BaseModel
from typing import Optional

class TemplateBase(BaseModel):
    name: str
    category: Optional[str]
    content: str  # JSON string or dict
    created_by: Optional[str]
    is_favorite: Optional[str]  # Change to bool if needed

class TemplateCreate(TemplateBase):
    id: str

class TemplateOut(TemplateBase):
    id: str

    class Config:
        orm_mode = True
