"use client";

import { useCalendar } from "@/contexts/CalendarContext";
import { Button, Tooltip } from "@yamada-ui/react";
import { format, subMonths, addMonths } from "date-fns";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function CalendarHeader() {
  const { currentDate, setCurrentDate } = useCalendar();

  return (
    <div className="flex items-center mb-4 gap-4">
      <div className="flex items-center gap-2">
        <Tooltip label={`${format(currentDate, "M月d日")}`}>
          <Button
            borderRadius="full"
            border="1px solid"
            background="none"
            fontWeight="400"
            onClick={() => setCurrentDate(new Date())}
          >
            今日
          </Button>
        </Tooltip>

        <div className="flex items-center gap-1">
          <Tooltip label="前月">
            <Button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              borderRadius="full"
              size="sm"
              height="auto"
              p={1}
              background="none"
            >
              <MdKeyboardArrowLeft className="text-2xl font-bold w-full h-full" />
            </Button>
          </Tooltip>
          <Tooltip label="翌月">
            <Button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              borderRadius="full"
              background="none"
              size="sm"
              height="auto"
              p={1}
            >
              <MdKeyboardArrowRight className="text-2xl font-bold w-full h-full" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="text-2xl">{format(currentDate, "yyyy年M月")}</div>
    </div>
  );
}
