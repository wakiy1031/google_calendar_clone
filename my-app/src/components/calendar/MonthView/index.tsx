"use client";

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
import EventModal from "@/components/events/EventModal";
import { useState } from "react";

export default function MonthView() {
  const { currentDate, addEvent, events } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

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

  // 日付クリック時のハンドラー
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime("00:00");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full p-2 rounded-xl bg-white">
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
        {days.map((day) => {
          // その日のイベントをフィルタリング
          const dayEvents = events.filter((event) =>
            isSameDay(event.date, day)
          );

          return (
            <div
              key={day.toISOString()}
              className={`
                min-h-[130px] p-1 border text-center cursor-pointer hover:bg-gray-50
                ${
                  format(day, "M") !== format(currentDate, "M")
                    ? "text-gray-400"
                    : ""
                }
              `}
              onClick={() => handleDateClick(day)}
            >
              <span
                className={`text-xs w-6 h-6 flex justify-center items-center mx-auto ${
                  isSameDay(day, new Date())
                    ? "rounded-full bg-blue-600 text-white"
                    : ""
                }`}
              >
                {format(day, "d")}
              </span>

              {/* イベントの表示 */}
              <div className="mt-1">
                {dayEvents.map((event) => {
                  const isAllDay =
                    event.startTime === "00:00" && event.endTime === "23:59";
                  return (
                    <div
                      key={event.id}
                      className={`text-xs mb-1 p-1 truncate ${
                        isAllDay
                          ? "bg-blue-400 text-white rounded"
                          : "text-gray-700"
                      }`}
                    >
                      {isAllDay ? (
                        event.title || "（タイトルなし）"
                      ) : (
                        <>
                          <span className="text-blue-400">⚫︎</span>
                          {format(
                            new Date(`2000-01-01T${event.startTime}`),
                            "HH:mm"
                          )}
                          {event.title || "（タイトルなし）"}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* イベント作成モーダル */}
      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSave={addEvent}
          isMonthView={true}
        />
      )}
    </div>
  );
}
