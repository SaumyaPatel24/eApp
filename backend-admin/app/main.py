# app/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Only import Base (not Admin or auth-related items)
from .models import Base
from .items import router as items_router
from .items_list import router as items_list_router
from .db_init import get_db, engine

# Example MySQL connection string
# mysql+pymysql://username:password@host:port/database
DATABASE_URL = os.getenv(
    "ADMIN_DATABASE_URL",
    "mysql+pymysql://root:EECS4413@localhost:3306/ecommerce"
)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(title="Items API (no local auth)")

origins = [os.getenv("ADMIN_FRONTEND_ORIGIN", "http://localhost:3001")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include only items router (public)
app.include_router(items_router, prefix="/items", tags=["items"])
app.include_router(items_list_router)


@app.on_event("startup")
def startup():
    # create tables for models that remain (e.g. Item)
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["health"])
def root():
    return {"status": "ok"}
