// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

//トップページ
"use client";

import { useState, useEffect } from "react";
import ShoppingItem from "@/components/ShoppingItem";
import ShoppingForm from "@/components/ShoppingForm";

export default function HomePage() {
  const [items, setItems] = useState([]);

  // ※ FastAPI → React の形式に変換する関数
  const convertItem = (d: any) => ({
    id: d.id,
    name: d.item,
    quantity: d.numberOfItem,
    priority: d.priority,
    isDone: d.isDone,
  });

  // ① 初回ロード：一覧取得（GET）
  useEffect(() => {
    const token = localStorage.getItem("idToken");

    fetch("/api/shopping_lists", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((d: any) => convertItem(d));
        setItems(formatted);
      })
      .catch((err) => console.error("GET エラー:", err));
  }, []);

  // ② アイテム追加（POST）
  const handleAdd = async (item: {
    name: string;
    quantity: number;
    priority: "high" | "low";
  }) => {
    const token = localStorage.getItem("idToken");

    try {
      const res = await fetch("/api/shopping_lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item: item.name,
          numberOfItem: item.quantity,
          priority: item.priority,
        }),
      });

      const newItem = await res.json();
      setItems((prev) => [...prev, convertItem(newItem)]);
    } catch (err) {
      console.error("POST エラー:", err);
    }
  };

  // ③ チェックON/OFF（PATCH）
  const handleCheck = async (id: number) => {
    const token = localStorage.getItem("idToken");

    // まずローカルの現在の isDone を取得
    const target = items.find((i) => i.id === id);
    if (!target) return;

    const newValue = !target.isDone;

    try {
      await fetch(`/api/shopping_lists/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDone: newValue }),
      });

      // ローカル更新
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isDone: newValue } : item
        )
      );
    } catch (err) {
      console.error("PATCH エラー:", err);
    }
  };

  // ④ 削除（DELETE）
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("idToken");

    try {
      await fetch(`/api/shopping_lists/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("DELETE エラー:", err);
    }
  };

  // ⑤ チェック済み一括削除
  const handleBulkDelete = async () => {
    const token = localStorage.getItem("idToken");
    const checkedIds = items.filter((i) => i.isDone).map((i) => i.id);

    if (checkedIds.length === 0) {
      alert("削除するチェック済みアイテムがありません");
      return;
    }

    try {
      await Promise.all(
        checkedIds.map((id) =>
          fetch(`/api/shopping_lists/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      setItems((prev) => prev.filter((item) => !item.isDone));
    } catch (err) {
      console.error("Bulk DELETE エラー:", err);
    }
  };

  // ⑥ ログアウト
  const handleLogout = () => {
    console.log("ログアウト処理（Firebase 担当が実装）");
  };

  // 表示グループ分け
  const highPriorityItems = items.filter((item) => item.priority === "high");
  const lowPriorityItems = items.filter((item) => item.priority === "low");

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center py-10">
      {/* ▼ 買い物リスト */}
      <h1 className="text-5xl font-bold text-center mb-4 text-amber-600">
        買い物リスト
      </h1>

      <div className="w-full max-w-md">
        {/* 高優先度 */}
        {highPriorityItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">優先度 高</h2>
            {highPriorityItems.map((item) => (
              <ShoppingItem
                key={item.id}
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                priority={item.priority}
                isDone={item.isDone}
                onCheck={handleCheck}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}

        {/* 低優先度 */}
        {lowPriorityItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-600 mt-6 mb-2">
              優先度 低
            </h2>
            {lowPriorityItems.map((item) => (
              <ShoppingItem
                key={item.id}
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                priority={item.priority}
                isDone={item.isDone}
                onCheck={handleCheck}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </div>

      {/* ▼ チェック済み一括削除 */}
      <div className="w-full max-w-md mt-6">
        <button
          onClick={handleBulkDelete}
          className="w-full bg-white border border-red-300 text-red-600 font-semibold py-3 rounded-xl shadow hover:bg-red-50 transition"
        >
          チェック済みアイテムを一括削除
        </button>
      </div>

      {/* ▼ 白いカード（追加フォーム） */}
      <div className="w-full max-w-md bg-white rounded-2xl p-10 mt-10 shadow">
        <h1 className="text-xl font-bold text-center mb-4 text-amber-500">
          ＋アイテム追加
        </h1>

        <ShoppingForm onAdd={handleAdd} />
      </div>

      {/* ▼ ログアウト */}
      <button
        onClick={handleLogout}
        className="mb-6 mt-2 text-sm text-blue-600 underline hover:text-red-800"
      >
        ログアウト
      </button>
    </div>
  );
}
