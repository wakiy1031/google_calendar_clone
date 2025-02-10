"use client";

import MonthView from "./MonthView";
import { CalendarProvider } from "@/contexts/CalendarContext";
import CalendarHeader from "./CalendarHeader";
export default function Calendar() {
  return (
    <CalendarProvider>
      <div className="container mx-auto p-4">
        <CalendarHeader />
        <MonthView />
      </div>
    </CalendarProvider>
  );
}
