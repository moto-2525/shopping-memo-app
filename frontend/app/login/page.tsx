//ログインページ
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/firebase/auth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/"); // ログイン後にトップページへ
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "ログインに失敗しました";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="w-full max-w-md bg-white rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-700">
          ログイン
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-xl transition-colors"
          >
            ログイン
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-amber-700">
          <Link href="/signup" className="underline hover:text-amber-900">
            新規登録はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
