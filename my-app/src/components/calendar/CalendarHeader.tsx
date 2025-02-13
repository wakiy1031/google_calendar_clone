"use client";

import { useCalendar } from "@/contexts/CalendarContext";
import { Button, Select, Option, Tooltip } from "@yamada-ui/react";
import { format, subMonths, addMonths, subWeeks, addWeeks } from "date-fns";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function CalendarHeader() {
  const { currentDate, setCurrentDate, viewMode, setViewMode } = useCalendar();

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
              onClick={() => {
                switch (viewMode) {
                  case "month":
                    setCurrentDate(subMonths(currentDate, 1));
                    break;
                  case "week":
                    setCurrentDate(subWeeks(currentDate, 1));
                    break;
                }
              }}
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
              onClick={() => {
                switch (viewMode) {
                  case "month":
                    setCurrentDate(addMonths(currentDate, 1));
                    break;
                  case "week":
                    setCurrentDate(addWeeks(currentDate, 1));
                    break;
                }
              }}
              borderRadius="full"
              size="sm"
              height="auto"
              p={1}
              background="none"
            >
              <MdKeyboardArrowRight className="text-2xl font-bold w-full h-full" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="text-2xl">{format(currentDate, "yyyy年M月")}</div>
      <Select
        defaultValue="month"
        w="100px"
        height="auto"
        borderRadius="full"
        border="1px solid"
      >
        <Option value="month" onClick={() => setViewMode("month")}>
          月
        </Option>
        <Option value="week" onClick={() => setViewMode("week")}>
          週
        </Option>
      </Select>
    </div>
  );
}
