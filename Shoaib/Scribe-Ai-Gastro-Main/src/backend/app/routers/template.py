from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.template import TemplateCreate, TemplateOut
from crud import template as crud_template

router = APIRouter(prefix="/templates", tags=["Templates"])

@router.post("/", response_model=TemplateOut)
def create_template(template: TemplateCreate, db: Session = Depends(get_db)):
    return crud_template.create_template(db, template)

@router.get("/{template_id}", response_model=TemplateOut)
def get_template(template_id: str, db: Session = Depends(get_db)):
    template = crud_template.get_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.get("/", response_model=list[TemplateOut])
def get_all_templates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_template.get_all_templates(db, skip, limit)

@router.delete("/{template_id}", response_model=TemplateOut)
def delete_template(template_id: str, db: Session = Depends(get_db)):
    deleted = crud_template.delete_template(db, template_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Template not found")
    return deleted
