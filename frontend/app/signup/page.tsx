//新規ユーザー登録ページ
"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";


export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // ログインが失敗したときにリダイレクトする仕組みを追加
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "登録に失敗しました";
      alert(message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="w-full max-w-md bg-white rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-700">
          新規登録
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 font-medium text-amber-800">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="teamb@mse.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-amber-800">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="パスワード"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-amber-800">パスワード確認</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="パスワード確認"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-xl transition-colors"
          >
            新規登録
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-amber-700">
          <Link href="/login" className="underline hover:text-amber-900">
            すでにアカウントをお持ちの方はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}