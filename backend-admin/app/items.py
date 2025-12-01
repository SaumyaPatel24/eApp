from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .db_init import get_db
from .models import Item
from .schemas import ItemCreate

router = APIRouter()

@router.post("/", response_model=ItemCreate)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(**item.model_dump())  # Pydantic v2 syntax
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "Item deleted"}

@router.patch("/{item_id}/stock")
def update_stock(item_id: int, stock: dict, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.stock = stock.get("stock", item.stock)
    db.commit()
    db.refresh(item)
    return {"detail": "Stock updated", "stock": item.stock}

@router.patch("/{item_id}/price")
def update_price(item_id: int, price: dict, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.price = price.get("price", item.price)
    db.commit()
    db.refresh(item)
    return {"detail": "Price updated", "price": item.price}

@router.patch("/{item_id}/color")
def remove_color(item_id: int, color: dict, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if item.colors:
        item.colors = [c for c in item.colors if c != color.get("color")]
    db.commit()
    db.refresh(item)
    return {"detail": "Color removed", "colors": item.colors}

@router.patch("/{item_id}/size")
def remove_size(item_id: int, size: dict, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if item.sizes:
        item.sizes = [s for s in item.sizes if s != size.get("size")]
    db.commit()
    db.refresh(item)
    return {"detail": "Size removed", "sizes": item.sizes}

@router.patch("/{item_id}/add-color-size")
def add_color_size(item_id: int, payload: dict, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    color = payload.get("color")
    sizes = payload.get("sizes", [])
    if color:
        if not item.colors:
            item.colors = []
        if color not in item.colors:
            item.colors.append(color)
    if sizes:
        if not item.sizes:
            item.sizes = []
        for s in sizes:
            if s not in item.sizes:
                item.sizes.append(s)
    if color and sizes:
        if not item.variants:
            item.variants = []
        item.variants.append({"color": color, "sizes": sizes})
    db.commit()
    db.refresh(item)
    return {"detail": "Color/Size added", "colors": item.colors, "sizes": item.sizes, "variants": item.variants}
