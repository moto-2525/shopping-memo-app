# seed.py
from app.db.session import SessionLocal
from app.models.shopping_list import ShoppingList
from random import randint, choice

db = SessionLocal()

# サンプルユーザーとアイテム
users = ["user1", "user2", "user3"]
items = [
    "りんご", "バナナ", "牛乳", "卵", "パン", "チーズ", "トマト", "きゅうり", "ヨーグルト", "お茶"
]

# データ投入
for user in users:
    for item_name in items:
        shopping_item = ShoppingList(
            firebase_uid=user,
            item=item_name,
            quantity=randint(1, 5),        # 1〜5個のランダム数量
            is_checked=choice([True, False])  # チェック済みかランダム
        )
        db.add(shopping_item)

db.commit()
db.close()
print(" シーディング完了（3名 × 10件）")
