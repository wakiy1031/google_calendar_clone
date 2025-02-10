"use client";

import { format } from "date-fns";

interface WeekCellProps {
  date: Date;
  isToday: boolean;
}

export default function WeekCell({ date, isToday }: WeekCellProps) {
  // 1時間ごとのセルを生成（午前0時から午後23時まで）
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative">
      {/* 日付表示 */}
      <div className="text-center sticky top-0 bg-white z-10 pt-1 pb-4 border-b">
        <span
          className={`text-lg w-10 h-10 flex justify-center items-center mx-auto ${
            isToday ? "rounded-full bg-blue-600 text-white" : ""
          }`}
        >
          {format(date, "d")}
        </span>
      </div>

      {/* 時間ごとのセル */}
      <div className="border-l overflow-y-scroll">
        {hours.map((hour) => (
          <div
            key={hour}
            className="h-[50px] border-b relative group hover:bg-gray-50"
          />
        ))}
      </div>
    </div>
  );
}
