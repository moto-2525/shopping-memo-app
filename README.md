# 🛒 お買い物メモアプリ（teamB_section7）

チーム開発で作成した、買い物メモを管理するWebアプリです。  
ユーザーごとに買い物リストを管理し、追加・編集・削除ができます。

---

## 概要

- ユーザー登録 / ログイン機能（JWT / Firebase）
- 自分専用の買い物リストを管理
- アイテムの追加・編集・削除
- チェック済み状態のON / OFF
- （発展案）LLMを用いた献立ベースの買い物リスト自動生成

---

## 使用技術

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Firebase Authentication
- REST API

### Frontend
- Next.js
- React
- TypeScript

### Infrastructure / Tools
- Docker / docker-compose
- GitHub
- pgAdmin

---

## ローカル開発環境

| サービス | URL |
|--------|-----|
| API (Swagger) | http://localhost:8000/docs |
| Shopping Lists API | http://localhost:8000/shopping-lists |
| Frontend | http://localhost:4000 |
| PostgreSQL | localhost:5433 |
| pgAdmin | http://localhost:8080 |

---

## チーム開発について

- フロントエンド / バックエンドを分離して開発
- GitHub Flow を用いたブランチ運用
- Pull Request ベースでレビューを実施

---

## 補足

本リポジトリは学習目的のチーム開発成果物です。
