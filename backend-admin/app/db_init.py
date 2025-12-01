# app/db_init.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# MySQL connection URL
DATABASE_URL = os.getenv(
    "ADMIN_DATABASE_URL",
    "mysql+pymysql://root:EECS4413@127.0.0.1:3306/ecommerce"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables (Item table only now)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
