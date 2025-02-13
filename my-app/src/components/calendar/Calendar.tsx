"use client";

import MonthView from "./MonthView";
import { CalendarProvider, useCalendar } from "@/contexts/CalendarContext";
import CalendarHeader from "./CalendarHeader";
import WeekView from "./WeekView";

export default function Calendar() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}

function CalendarContent() {
  const { viewMode } = useCalendar();

  return (
    <div className="container mx-auto p-4">
      <CalendarHeader />
      {viewMode === "month" && <MonthView />}
      {viewMode === "week" && <WeekView />}
    </div>
  );
}
