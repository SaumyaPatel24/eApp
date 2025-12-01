from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .db_init import get_db
from .models import Item

router = APIRouter()

@router.get("/items/")
def list_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()
    return items
