from pydantic import BaseModel


class InteractionCreate(BaseModel):
    doctor_name: str
    meeting_date: str
    notes: str
    ai_summary: str


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True