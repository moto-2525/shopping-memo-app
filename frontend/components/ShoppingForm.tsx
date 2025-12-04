//新規アイテム追加フォーム
"use client";

import { useState } from "react";

type Props = {
  onAdd: (item: { name: string; quantity: number; priority: "high" | "low" }) => void;
};

export default function ShoppingForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState<"high" | "low">("high");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAdd({ name, quantity, priority });

    setName("");
    setQuantity(1);
    setPriority("high");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

      {/* 名前 */}
      <input
        className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="買うもの（例: 牛乳）"
      />

      {/* 個数 */}
      <input
        type="number"
        min="1"
        className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="個数"
      />

      {/* 優先度 */}
      <select
        className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
        value={priority}
        onChange={(e) => setPriority(e.target.value as "high" | "low")}
      >
        <option value="high">優先度：高</option>
        <option value="low">優先度：低</option>
      </select>

      {/* 追加ボタン */}
      <button
        type="submit"
        className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-xl transition-colors"
      >
        追加
      </button>
    </form>
  );
}



