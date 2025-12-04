from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.db.session import Base, engine, get_db
from app.schemas.shopping_list import (
    ShoppingListCreate,
    ShoppingListResponse
)
from app.crud.shopping_list import create_list, get_lists_by_uid

# DB テーブル作成（初回のみ）
Base.metadata.create_all(bind=engine)

app = FastAPI()

# GET ルート（既存）
@app.get("/shopping_lists/", response_model=list[ShoppingListResponse])
def read_lists(db: Session = Depends(get_db)):
    return get_lists_by_uid(db, uid="testuser")

# POST ルート（追加）
@app.post("/shopping_lists/", response_model=ShoppingListResponse)
def add_list(item: ShoppingListCreate, db: Session = Depends(get_db)):
    return create_list(db, uid="testuser", data=item)
