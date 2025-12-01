from sqlalchemy import Column, Integer, String, Float, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Item(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    brand = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    rating = Column(Float, nullable=True)
    stock = Column(Integer, nullable=False)
    imageUrl = Column(String(500), nullable=True)
    colors = Column(JSON, nullable=True)
    sizes = Column(JSON, nullable=True)
    variants = Column(JSON, nullable=True)
