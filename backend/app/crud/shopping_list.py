from sqlalchemy.orm import Session
from app.models.shopping_list import ShoppingList
from app.schemas.shopping_list import ShoppingListCreate

def create_list(db: Session, uid: str, data: ShoppingListCreate):
    item = ShoppingList(uid=uid, title=data.title)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def get_lists_by_uid(db: Session, uid: str):
    return db.query(ShoppingList).filter(ShoppingList.uid == uid).all()
