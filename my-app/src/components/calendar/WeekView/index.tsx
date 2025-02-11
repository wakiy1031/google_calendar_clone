"use client";

import { useCalendar } from "@/contexts/CalendarContext";
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { ja } from "date-fns/locale";
import WeekCell from "./WeekCell";
import EventModal from "@/components/events/EventModal";
import { useState } from "react";

export default function WeekView() {
  const { currentDate, setCurrentDate, addEvent, events } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const weekStart = startOfWeek(currentDate, { locale: ja });
  const weekEnd = endOfWeek(currentDate, { locale: ja });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // 週に終日イベントがあるかどうかを判定
  const hasAllDayEvent = events.some(
    (event) => event.startTime === "00:00" && event.endTime === "23:59"
  );

  // 週内の最大終日イベント数を計算
  const maxAllDayEvents = days.reduce((max, day) => {
    const dayEventCount = events.filter(
      (event) =>
        isSameDay(event.date, day) &&
        event.startTime === "00:00" &&
        event.endTime === "23:59"
    ).length;
    return Math.max(max, dayEventCount);
  }, 0);

  const handleTimeClick = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="w-full p-2 rounded-xl bg-white">
      {/* 曜日の行 */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] mb-1">
        <div /> {/* 時間列のための空白 */}
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* 時間のグリッド */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)]">
        {/* 時間軸 */}
        <div
          className={`eventPadding ${
            hasAllDayEvent ? `active count-${maxAllDayEvents}` : ""
          }`}
        >
          <div className="h-[48px] relative"></div>
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] relative">
              <span className="absolute top-1 right-2 text-xs text-gray-400">
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
            onTimeClick={handleTimeClick}
            onDateChange={handleDateChange}
            events={events}
            hasAllDayEvent={hasAllDayEvent}
            maxAllDayEvents={maxAllDayEvents}
          />
        ))}
      </div>

      {/* イベント作成モーダル */}
      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSave={addEvent}
        />
      )}
    </div>
  );
}
