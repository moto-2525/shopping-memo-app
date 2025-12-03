# ベースイメージ
FROM node:20

# アプリケーションディレクトリ
WORKDIR /app

# 依存関係ファイルのみコピー
COPY package.json package-lock.json* ./

# 依存インストール
RUN npm install

# プロジェクト全体をコピー
COPY . .

# ポート解放（Next.js のデフォルトは 3000）
EXPOSE 3000

# 開発サーバー起動
CMD ["npm", "run", "dev"]