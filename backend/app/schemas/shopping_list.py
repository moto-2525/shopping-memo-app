from pydantic import BaseModel

# ▼ 共通フィールド
class ShoppingListBase(BaseModel):
    item: str
    quantity: int = 1
    is_checked: bool = False


# ▼ POST / リクエスト用（新規作成時）
class ShoppingListCreate(ShoppingListBase):
    firebase_uid: str  # ← こっちが正しい！


# ▼ レスポンス用（GET / POST）
class ShoppingListResponse(ShoppingListBase):
    id: int
    firebase_uid: str  # ← ここも firebase_uid

    class Config:
        from_attributes = True  # Pydantic v2 用

# ▼ 更新用（CREATE）
class ShoppingListUpdate(BaseModel):
    title: str | None = None
    quantity: int | None = None
    is_checked: bool | None = None

# ▼ トグル
class ShoppingListToggle(BaseModel):
    is_checked: bool