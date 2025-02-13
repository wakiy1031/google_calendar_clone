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
import EventDetailModal from "@/components/events/EventDetailModal";
import { useState } from "react";
import { Event } from "@/types";

export default function MonthView() {
  const { currentDate, addEvent, updateEvent, deleteEvent, events } =
    useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

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
  const handleDateClick = (e: React.MouseEvent<HTMLDivElement>, date: Date) => {
    e.preventDefault();
    setSelectedDate(date);
    setSelectedTime("00:00");
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEventClick = (
    e: React.MouseEvent<HTMLDivElement>,
    event: Event
  ) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleEditEvent = () => {
    setIsDetailModalOpen(false);
    setSelectedDate(selectedEvent!.date);
    setSelectedTime(selectedEvent!.startTime);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setIsDetailModalOpen(false);
      setSelectedEvent(undefined);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
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
                min-h-[130px] p-1 border text-left cursor-pointer hover:bg-gray-50
                ${
                  format(day, "M") !== format(currentDate, "M")
                    ? "text-gray-400"
                    : ""
                }
              `}
              onClick={(e) => handleDateClick(e, day)}
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
                      onClick={(e) => handleEventClick(e, event)}
                      key={event.id}
                      className={`text-xs mb-1 p-1 truncate hover:opacity-75 ${
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
                          <span className="ml-2">
                            {event.title || "（タイトルなし）"}
                          </span>
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

      {/* イベント作成/編集モーダル */}
      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSave={addEvent}
          onUpdate={updateEvent}
          onDelete={deleteEvent}
          isMonthView={true}
          event={selectedEvent}
        />
      )}

      {/* イベント詳細モーダル */}
      {selectedEvent && (
        <EventDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          event={selectedEvent}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
}
