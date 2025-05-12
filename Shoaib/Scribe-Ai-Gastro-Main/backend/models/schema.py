from pydantic import BaseModel

# Model for data received from the frontend
class Message(BaseModel):
    text: str
