//アイテム１件分の表示
"use client";

type Props = {
  id: number;
  name: string;
  isDone: boolean;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ShoppingItem({
  id,
  name,
  isDone,
  onCheck,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      {/* 左側：✔︎ボタン + テキスト */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onCheck(id)}
          className={`w-7 h-7 flex items-center justify-center rounded-full border ${
            isDone ? "bg-green-500 text-white" : "bg-white text-green-600"
          }`}
        >
          ✔
        </button>

        <span className={isDone ? "line-through text-gray-400" : ""}>
          {name}
        </span>
      </div>

      {/* 右側：削除ボタン */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 text-lg px-2"
      >
        🗑️
      </button>
    </div>
  );
}