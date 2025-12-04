from sqlalchemy import Column, Integer, String, Boolean, text
from app.db.session import Base

class ShoppingList(Base):
    __tablename__ = "shopping_list"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, index=True, nullable=False)
    item = Column(String, nullable=False)
    quantity = Column(Integer, default=1, server_default=text("1"))
    is_checked = Column(Boolean, default=False, server_default=text("FALSE"))

