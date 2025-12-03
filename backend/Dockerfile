FROM python:3.12-slim

WORKDIR /app

# 依存インストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 開発用コマンド（ホットリロード）
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]