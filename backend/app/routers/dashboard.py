from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.doctor import Doctor
from app.models.interaction import Interaction

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_doctors = db.query(Doctor).count()
    total_interactions = db.query(Interaction).count()

    ai_summaries = (
        db.query(Interaction)
        .filter(Interaction.ai_summary != "")
        .count()
    )

    return {
        "total_doctors": total_doctors,
        "total_interactions": total_interactions,
        "ai_summaries": ai_summaries,
    }