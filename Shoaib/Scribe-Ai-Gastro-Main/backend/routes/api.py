from fastapi import APIRouter
from models.schema import Message  # import your data model

router = APIRouter()

@router.get("/hello")
async def say_hello():
    return {"message": "Hello from the backend!"}

@router.post("/submit/")
async def submit_message(data: Message):
    # You could add saving to DB or further processing here
    return {"received_text": data.text}
