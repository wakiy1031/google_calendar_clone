"use client";

import { createContext, useContext, useState } from "react";
import { CalendarContextType, ViewMode } from "@/types";

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
