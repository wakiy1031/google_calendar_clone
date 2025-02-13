import { Button, Flex } from "@yamada-ui/react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  format,
} from "date-fns";
import { ja } from "date-fns/locale";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface DatePickerCalendarProps {
  currentDate: Date;
  calendarMonth: Date;
  setCalendarMonth: (date: Date) => void;
  onDateSelect: (date: Date) => void;
}

export default function DatePickerCalendar({
  currentDate,
  calendarMonth,
  setCalendarMonth,
  onDateSelect,
}: DatePickerCalendarProps) {
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const calendarStart = startOfWeek(monthStart, { locale: ja });
  const calendarEnd = endOfWeek(monthEnd, { locale: ja });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="w-64">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">
          {format(calendarMonth, "yyyy年M月")}
        </div>
        <Flex>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
          >
            <MdKeyboardArrowLeft />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
          >
            <MdKeyboardArrowRight />
          </Button>
        </Flex>
      </div>

      {/* 曜日の行 */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* 日付のグリッド */}
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <button
            key={day.toISOString()}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDateSelect(day);
            }}
            className={`
              w-8 h-8 text-sm flex items-center justify-center
              ${
                !isSameMonth(day, calendarMonth)
                  ? "text-gray-300"
                  : isSameDay(day, currentDate)
                  ? "bg-blue-600 text-white rounded-full"
                  : "hover:bg-gray-100 rounded-full"
              }
            `}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}
