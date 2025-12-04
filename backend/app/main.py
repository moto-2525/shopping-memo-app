from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 🟣 ルーター import
from app.api.v1.shopping_list import router as shopping_list_router

app = FastAPI(
    title="Shopping Memo API",
    version="1.0.0",
)

# --- CORS 設定 ---
origins = [
    "http://localhost:3000",
    "http://localhost:4000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ルーター登録 ---
app.include_router(
    shopping_list_router,
    prefix="/shopping_lists",
    tags=["shopping_lists"],
)

# --- 動作確認用 ---
@app.get("/")
async def root():
    return {"message": "Shopping Memo API is running!"}