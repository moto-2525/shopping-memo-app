from pydantic import BaseModel


# -------------------------------
# 共通フィールド
# -------------------------------
class ShoppingListBase(BaseModel):
    title: str
    quantity: int = 1
    is_checked: bool = False


# -------------------------------
# POST / リクエスト用
# -------------------------------
class ShoppingListCreate(ShoppingListBase):
    pass


# -------------------------------
# レスポンス用（GET / POST 返り値）
# -------------------------------
class ShoppingList(ShoppingListBase):
    id: int
    uid: str  # Firebase UID

    class Config:
        orm_mode = True