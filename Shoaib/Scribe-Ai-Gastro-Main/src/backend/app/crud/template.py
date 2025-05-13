from sqlalchemy.orm import Session
from models.template import Template
from schemas.template import TemplateCreate

def create_template(db: Session, template: TemplateCreate):
    db_template = Template(**template.dict())
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template

def get_template(db: Session, template_id: str):
    return db.query(Template).filter(Template.id == template_id).first()

def get_all_templates(db: Session):
    return db.query(Template).all()

def delete_template(db: Session, template_id: str):
    template = db.query(Template).filter(Template.id == template_id).first()
    if not template:
        return None
    db.delete(template)
    db.commit()
    return template
