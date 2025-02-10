"use client";

import { useCalendar } from "@/contexts/CalendarContext";
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { ja } from "date-fns/locale";
import WeekCell from "./WeekCell";

export default function WeekView() {
  const { currentDate } = useCalendar();
  const weekStart = startOfWeek(currentDate, { locale: ja });
  const weekEnd = endOfWeek(currentDate, { locale: ja });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weekDays = ["日", "月", "火", "水", "木", "土"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="w-full p-2 rounded-xl bg-white">
      {/* 曜日の行 */}
      <div className="grid grid-cols-[50px_repeat(7,1fr)] mb-1">
        <div /> {/* 時間列のための空白 */}
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* 時間のグリッド */}
      <div className="grid grid-cols-[50px_repeat(7,1fr)]">
        {/* 時間軸 */}
        <div className="mt-16">
          {hours.map((hour) => (
            <div key={hour} className="h-[50px] relative">
              <span className="absolute -top-2 right-2 text-xs text-gray-400">
                {`${hour}:00`}
              </span>
            </div>
          ))}
        </div>

        {/* 日付のセル */}
        {days.map((day) => (
          <WeekCell
            key={day.toISOString()}
            date={day}
            isToday={isSameDay(day, new Date())}
          />
        ))}
      </div>
    </div>
  );
}
