from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.shopping_list import ShoppingListCreate
from app.crud.shopping_list import (
    create_list,
    get_lists_by_uid,
    update_list,
    toggle_done,
    delete_list
)
# トークン検証ロジックをインポート
from app.auth import verify_firebase_token

router = APIRouter()


# 🟦 1. リスト作成（POST）
@router.post("/shopping-lists")
def create_shopping_list(
    data: ShoppingListCreate,
    decoded_token:dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
    firebase_uid = decoded_token["uid"]
    return create_list(db, firebase_uid, data)


# 🟩 2. 特定ユーザーのリスト取得（GET）
@router.get("/shopping-lists")
def get_user_lists(
    decoded_token:dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
    firebase_uid = decoded_token["uid"]
    return get_lists_by_uid(db, firebase_uid)


# 🟧 3. リスト更新（PUT）
@router.put("/shopping-lists/{item_id}")
def update_shopping_list(
    item_id: int, 
    data: ShoppingListCreate,
    decoded_token:dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
   firebase_uid = decoded_token["uid"]
   return update_list(db, item_id, firebase_uid,data)


# 🟨 4. DONE の ON/OFF 切替（PATCH）
@router.patch("/shopping-lists/{item_id}/toggle")
def toggle_shopping_list(
    item_id: int,
    decoded_token:dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
   firebase_uid = decoded_token["uid"]
   return toggle_done(db, item_id,firebase_uid)


# 🟥 5. リスト削除（DELETE）
@router.delete("/shopping-lists/{item_id}")
def delete_shopping_list(
    item_id: int,
    decoded_token:dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db)
):
   firebase_uid = decoded_token["uid"]
   return delete_list(db, item_id,firebase_uid)