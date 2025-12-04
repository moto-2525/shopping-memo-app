from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# DB
from app.db.session import Base, engine, get_db

# Schemas
from app.schemas.shopping_list import (
    ShoppingListCreate,
    ShoppingListResponse,
)

# CRUD
from app.crud.shopping_list import (
    create_list,
    get_lists_by_uid,
)

# Router（developのもの）
from app.api.v1.shopping_list import router as shopping_list_router


# DB テーブル作成（初回のみ）
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Shopping Memo API",
    version="1.0.0",
)

# ---- CORS 設定 ----
origins = [
    "http://localhost:3000",
    "http://localhost:4000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- ルーター登録 ----
app.include_router(
    shopping_list_router,
    prefix="/shopping_lists",
    tags=["shopping_lists"],
)

# ---- 動作確認 ----
@app.get("/")
async def root():
    return {"message": "Shopping Memo API is running!"}