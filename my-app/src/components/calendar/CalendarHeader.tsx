"use client";

import { useCalendar } from "@/contexts/CalendarContext";
import { format } from "date-fns";

export default function CalendarHeader() {
  const { currentDate } = useCalendar();

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-2xl">{format(currentDate, "yyyy年M月")}</div>
    </div>
  );
}
