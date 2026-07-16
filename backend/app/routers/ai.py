from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.graph import run_ai

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

class SummaryRequest(BaseModel):
    notes: str

class SummaryResponse(BaseModel):
    summary: str

@router.post("/summary", response_model=SummaryResponse)
def generate_summary(request: SummaryRequest):
    summary = run_ai(request.notes)
    return {"summary": summary}