//アイテム１件分の表示
"use client";

type ItemProps = {
  id: number;
  name: string;
  isDone: boolean;
  priority: "high" | "low";
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ShoppingItem({
  id,
  name,
  isDone,
  priority,
  onCheck,
  onDelete,
}: ItemProps) {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg mb-3 border
        ${priority === "high" ? "bg-red-100 border-red-300" : "bg-white"}
      `}
    >
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onCheck(id)}
        />
        <span className={isDone ? "line-through text-gray-500" : ""}>
          {name}
        </span>
      </label>

      <button
        onClick={() => onDelete(id)}
        className="text-sm text-red-600 hover:underline"
      >
        削除
      </button>
    </div>
  );
}