//新規ユーザー登録ページ
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 後で Firebase 担当が利用できるダミー関数
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    console.log("新規登録:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">新規ユーザー登録</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <div>
            <label className="block mb-1 font-medium">メールアドレス</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teamb@mse.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">パスワード</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">パスワード（確認用）</label>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="もう一度入力してください"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-2"
          >
            新規登録
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          すでにアカウントがある→{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            ログインはこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
