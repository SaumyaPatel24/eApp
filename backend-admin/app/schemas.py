# app/schemas.py
from typing import List, Optional
from pydantic import BaseModel

class Variant(BaseModel):
    color: str
    sizes: List[int]

class ItemCreate(BaseModel):
    name: str
    brand: str
    category: str
    price: float
    rating: Optional[float] = None
    stock: int
    imageUrl: Optional[str] = None
    colors: Optional[List[str]] = None
    sizes: Optional[List[int]] = None
    variants: Optional[List[Variant]] = None

class ItemOut(ItemCreate):
    id: int

    class Config:
        from_attributes = True
