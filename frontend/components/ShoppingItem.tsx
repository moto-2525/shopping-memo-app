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
      <div>
        <p className="text-lg font-semibold">
          {name}（{quantity}個）
        </p>
        <p className="text-sm text-gray-600">
          優先度：{priority === "high" ? "高" : "低"}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onCheck(id)}
          className="text-sm px-3 py-1 bg-green-200 rounded hover:bg-green-300"
        >
          ✓
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-sm px-3 py-1 bg-red-200 rounded hover:bg-red-300"
        >
          削除
        </button>
      </div>
    </div>
  );
}
