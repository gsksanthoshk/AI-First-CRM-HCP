from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    doctor_name = Column(String(100), nullable=False)
    meeting_date = Column(String(50), nullable=False)
    notes = Column(Text, nullable=False)
    ai_summary = Column(Text)