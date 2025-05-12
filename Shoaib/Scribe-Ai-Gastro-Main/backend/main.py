from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import api  # importing your routes

app = FastAPI()

# Allow your frontend to access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routes
app.include_router(api.router)

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}
