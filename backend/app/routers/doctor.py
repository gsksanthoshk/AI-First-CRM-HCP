from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorCreate, DoctorResponse

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"]
)

@router.post("/", response_model=DoctorResponse)
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):
    try:
        new_doctor = Doctor(
            name=doctor.name,
            hospital=doctor.hospital,
            specialty=doctor.specialty,
            email=str(doctor.email),
            phone=doctor.phone
        )

        db.add(new_doctor)
        db.commit()
        db.refresh(new_doctor)

        return new_doctor

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=List[DoctorResponse])
def get_doctors(
    db: Session = Depends(get_db)
):
    return db.query(Doctor).all()


@router.put("/{doctor_id}", response_model=DoctorResponse)
def update_doctor(
    doctor_id: int,
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):
    db_doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not db_doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    db_doctor.name = doctor.name
    db_doctor.hospital = doctor.hospital
    db_doctor.specialty = doctor.specialty
    db_doctor.email = str(doctor.email)
    db_doctor.phone = doctor.phone

    db.commit()
    db.refresh(db_doctor)

    return db_doctor

@router.delete("/{doctor_id}")
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    db.delete(doctor)
    db.commit()

    return {"message": "Doctor deleted successfully"}