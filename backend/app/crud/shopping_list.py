from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.shopping_list import ShoppingList
from app.schemas.shopping_list import ShoppingListCreate, ShoppingListUpdate


# UID一覧取得
def get_lists_by_uid(db: Session, firebase_uid: str):
    return db.query(ShoppingList).filter(ShoppingList.firebase_uid == firebase_uid).all()


# 新規作成
def create_list(db: Session, data: ShoppingListCreate):
    db_obj = ShoppingList(
        firebase_uid=data.firebase_uid,
        item=data.item,
        quantity=data.quantity,
        is_checked=data.is_checked,
    )

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


# 1件取得
def get_list(db: Session, item_id: int):
    return db.query(ShoppingList).filter(ShoppingList.id == item_id).first()


# 更新（PATCH）
def update_list(db: Session, item_id: int, updates: ShoppingListUpdate):
    db_obj = get_list(db, item_id)

    if not db_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )

    if updates.item is not None:
        db_obj.item = updates.item

    if updates.quantity is not None:
        db_obj.quantity = updates.quantity

    if updates.is_checked is not None:
        db_obj.is_checked = updates.is_checked

    db.commit()
    db.refresh(db_obj)
    return db_obj


# is_checked  true/false 
def toggle_done(db: Session, item_id: int):
    db_obj = get_list(db, item_id)

    if not db_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )

    db_obj.is_checked = not db_obj.is_checked

    db.commit()
    db.refresh(db_obj)
    return db_obj



# 削除
def delete_list(db: Session, item_id: int):
    db_obj = get_list(db, item_id)

    if not db_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )

    db.delete(db_obj)
    db.commit()

