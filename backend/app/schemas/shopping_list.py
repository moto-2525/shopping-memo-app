from pydantic import BaseModel

# ▼ 共通フィールド
class ShoppingListBase(BaseModel):
    title: str
    quantity: int = 1
    is_checked: bool = False

# ▼ POST用
class ShoppingListCreate(ShoppingListBase):
    firebase_uid: str

# ▼ レスポンス用（GET / POST）
class ShoppingListResponse(ShoppingListBase):
    id: int
    firebase_uid: str

    class Config:
        from_attributes = True  # Pydantic v2