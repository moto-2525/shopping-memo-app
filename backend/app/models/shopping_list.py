from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from app.db.session import Base

class ShoppingList(Base):
    __tablename__ = "shopping_lists"

    id = Column(Integer, primary_key=True, index=True)
    uid = Column(String, index=True)
    title = Column(String, nullable=False)
    done = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
