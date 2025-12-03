from pydantic import BaseModel

class ShoppingListBase(BaseModel):
    title: str

class ShoppingListCreate(ShoppingListBase):
    pass

class ShoppingListResponse(ShoppingListBase):
    id: int
    uid: str
    done: bool

    class Config:
        orm_mode = True
