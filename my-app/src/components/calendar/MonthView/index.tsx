import { useCalendar } from "@/contexts/CalendarContext";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
} from "date-fns";
import { ja } from "date-fns/locale";

export default function MonthView() {
  const { currentDate } = useCalendar();

  // 月の最初の日から最後の日までを取得
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // カレンダーグリッドに表示する日付の範囲を取得
  const calendarStart = startOfWeek(monthStart, { locale: ja });
  const calendarEnd = endOfWeek(monthEnd, { locale: ja });

  // 日付の配列を生成
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // 曜日の配列
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="w-full">
      {/* 曜日の行 */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* 日付のグリッド */}
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`
              min-h-[130px] p-1 border text-center
              ${
                format(day, "M") !== format(currentDate, "M")
                  ? "text-gray-400"
                  : ""
              }
            `}
          >
            <span
              className={`text-xs p-1 ${
                isSameDay(day, new Date())
                  ? "rounded-full bg-blue-600 text-white"
                  : ""
              }`}
            >
              {format(day, "d")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
