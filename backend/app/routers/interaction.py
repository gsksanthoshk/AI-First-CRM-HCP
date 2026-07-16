from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)

@router.post("/", response_model=InteractionResponse)
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    try:
        new_interaction = Interaction(
            doctor_name=interaction.doctor_name,
            meeting_date=interaction.meeting_date,
            notes=interaction.notes,
            ai_summary=interaction.ai_summary,
        )

        db.add(new_interaction)
        db.commit()
        db.refresh(new_interaction)

        return new_interaction

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/", response_model=list[InteractionResponse])
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()


@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    db_interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not db_interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")

    db_interaction.doctor_name = interaction.doctor_name
    db_interaction.meeting_date = interaction.meeting_date
    db_interaction.notes = interaction.notes
    db_interaction.ai_summary = interaction.ai_summary

    db.commit()
    db.refresh(db_interaction)

    return db_interaction


@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    db_interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not db_interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")

    db.delete(db_interaction)
    db.commit()

    return {"message": "Interaction deleted successfully"}