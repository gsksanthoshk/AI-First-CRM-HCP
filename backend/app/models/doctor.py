from sqlalchemy import Column, Integer, String
from app.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    hospital = Column(String(100))
    specialty = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(20))