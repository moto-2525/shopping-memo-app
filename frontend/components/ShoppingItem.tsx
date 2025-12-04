//アイテム１件分の表示
"use client";

type Props = {
  id: number;
  name: string;
  quantity: number;
  priority: "high" | "low";
  isDone: boolean;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ShoppingItem({
  id,
  name,
  quantity,
  priority,
  isDone,
  onCheck,
  onDelete,
}: Props) {
  return (
    <div
      className={`flex justify-between items-center p-4 mb-3 rounded-xl border shadow-sm transition 
        ${priority === "high" ? "bg-red-100" : "bg-white"} 
        ${isDone ? "opacity-60 line-through" : ""}`}
    >
      {/* 左側にチェックボックス */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onCheck(id)}
          className="w-5 h-5 accent-green-500" // Tailwindで色とサイズ調整
        />

        {/* アイテム情報（横並び） */}
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-700">{quantity}個</p>
        </div>
      </div>

      {/* 右側：削除ボタン */}
      <button
        onClick={() => onDelete(id)}
        className="text-sm px-3 py-1 bg-red-200 rounded hover:bg-red-300"
      >
        削除
      </button>
    </div>
  );
}
