"use client";

import { Event } from "@/types";
import { format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";

interface WeekCellProps {
  date: Date;
  isToday: boolean;
  onTimeClick: (date: Date, time: string) => void;
  onDateChange?: (date: Date) => void;
  events: Event[];
  hasAllDayEvent: boolean;
  maxAllDayEvents: number;
}

export default function WeekCell({
  date,
  isToday,
  onTimeClick,
  onDateChange,
  events,
  hasAllDayEvent,
  maxAllDayEvents,
}: WeekCellProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 現在時刻を1分ごとに更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // 現在時刻のポジションを計算
  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return hours * 60 + minutes;
  };

  // 1時間ごとのセルを生成（午前0時から午後23時まで）
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // その日のイベントをフィルタリング
  const dayEvents = events.filter((event) => isSameDay(event.date, date));
  const allDayEventsCount = dayEvents.filter(
    (event) => event.startTime === "00:00" && event.endTime === "23:59"
  ).length;

  return (
    <div className="relative">
      {/* 日付表示 */}
      <div
        className={`text-center sticky top-0 bg-white z-20 pt-1 pb-4 border-b eventSpace ${
          hasAllDayEvent ? `active count-${maxAllDayEvents}` : ""
        }`}
        style={{
          paddingBottom: hasAllDayEvent
            ? `${maxAllDayEvents * 2}rem`
            : undefined,
        }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => onTimeClick(date, "00:00")}
            className={`text-lg w-10 h-10 flex justify-center items-center mx-auto rounded-full transition-colors ${
              isToday
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-gray-200"
            }`}
          >
            {format(date, "d")}
          </button>
          {/* 終日イベントの表示 */}
          {dayEvents
            .filter(
              (event) =>
                event.startTime === "00:00" && event.endTime === "23:59"
            )
            .map((event, index) => (
              <div
                key={event.id}
                className="text-xs mb-1 p-1 bg-blue-400 text-white rounded truncate mx-1 absolute left-1/2 -translate-x-1/2"
                style={{ bottom: `${-2 - index * 1.75}rem` }}
              >
                {event.title || "（タイトルなし）"}
              </div>
            ))}
        </div>
      </div>

      {/* 時間ごとのセル */}
      <div className="border-l relative">
        {/* 現在時刻のバー */}
        {isToday && (
          <div
            className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
            style={{
              top: `${getCurrentTimePosition()}px`,
            }}
          >
            <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-red-500" />
          </div>
        )}

        {hours.map((hour) => (
          <div
            key={hour}
            className="h-[60px] border-b relative group hover:bg-gray-50 cursor-pointer"
          >
            {/* 30分区切りで2つのセルを作成 */}
            <div
              onClick={() =>
                onTimeClick(date, `${hour.toString().padStart(2, "0")}:00`)
              }
              className="h-[30px] relative group hover:bg-gray-50 cursor-pointer"
            />
            <div
              onClick={() =>
                onTimeClick(date, `${hour.toString().padStart(2, "0")}:30`)
              }
              className="h-[30px] relative group hover:bg-gray-50 cursor-pointer"
            />
          </div>
        ))}

        {/* 時間指定ありのイベントの表示 */}
        {dayEvents
          .filter(
            (event) =>
              !(event.startTime === "00:00" && event.endTime === "23:59")
          )
          .map((event) => {
            const [startHour, startMinute] = event.startTime
              .split(":")
              .map(Number);
            const [endHour, endMinute] = event.endTime.split(":").map(Number);
            const top = startHour * 60 + (startMinute / 30) * 30;
            const height =
              (endHour - startHour) * 60 +
              ((endMinute - startMinute) / 30) * 30;

            return (
              <div
                key={event.id}
                className="absolute left-0 right-0 mx-1 rounded bg-blue-400 border border-blue-200 p-0.5 overflow-hidden"
                style={{
                  top: `${top}px`,
                  height: `${height}px`,
                }}
              >
                <div className="text-xs truncate leading-none text-white">
                  {event.title ? event.title : "（タイトルなし）"}
                </div>
                <div className="text-xs text-white -mt-0.5">
                  {event.startTime} ~ {event.endTime}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
