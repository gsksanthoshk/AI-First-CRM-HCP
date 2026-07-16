from pydantic import BaseModel, EmailStr

class DoctorCreate(BaseModel):
    name: str
    hospital: str
    specialty: str
    email: EmailStr
    phone: str


class DoctorResponse(DoctorCreate):
    id: int

    class Config:
        from_attributes = True