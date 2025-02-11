"use client";

import { Event } from "@/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Input,
  Button,
  FormControl,
  Label,
  useDisclosure,
} from "@yamada-ui/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import DatePickerCalendar from "./DatePickerCalendar";
import TimeSelector from "./TimeSelector";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime?: string;
  onSave: (event: Omit<Event, "id">) => void;
  isMonthView?: boolean;
}

export default function EventModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onSave,
  isMonthView = false,
}: EventModalProps) {
  const [showTimeSelect, setShowTimeSelect] = useState(!isMonthView);
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(currentDate);
  const [startTime, setStartTime] = useState(selectedTime || "00:00");
  const [endTime, setEndTime] = useState(
    selectedTime
      ? `${parseInt(selectedTime.split(":")[0]) + 1}:${
          selectedTime.split(":")[1]
        }`
      : "01:00"
  );

  // selectedDateが変更されたときにcurrentDateを更新
  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  // selectedTimeが変更されたときにstartTimeを更新（初回のみ）
  useEffect(() => {
    if (selectedTime) {
      setStartTime(selectedTime);
      setEndTime(
        `${parseInt(selectedTime.split(":")[0]) + 1}:${
          selectedTime.split(":")[1]
        }`
      );
    }
  }, [selectedTime]);

  // モーダルが閉じられるときの処理
  const handleClose = () => {
    onClose();
    if (isMonthView) {
      setShowTimeSelect(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSave({
      title: formData.get("title") as string,
      date: currentDate,
      startTime: showTimeSelect ? startTime : "00:00",
      endTime: showTimeSelect ? endTime : "23:59",
    });
    handleClose();
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    setShowCalendar(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" height="55dvh">
      <ModalOverlay />
      <ModalBody overflow="none">
        <ModalHeader>予定を追加</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <FormControl>
            <Label>タイトル</Label>
            <Input name="title" placeholder="予定のタイトル" />
          </FormControl>

          <FormControl>
            <Label>日付</Label>
            <div className="relative">
              <Input
                value={format(currentDate, "yyyy/MM/dd")}
                readOnly
                cursor="pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              />
              {showCalendar && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded-lg shadow-lg z-50">
                  <DatePickerCalendar
                    currentDate={currentDate}
                    calendarMonth={calendarMonth}
                    setCalendarMonth={setCalendarMonth}
                    onDateSelect={handleDateSelect}
                  />
                </div>
              )}
            </div>
          </FormControl>

          {isMonthView && !showTimeSelect && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTimeSelect(true)}
            >
              時間を指定する
            </Button>
          )}

          {showTimeSelect && (
            <TimeSelector
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={(time) => {
                setStartTime(time);
                setEndTime(
                  `${parseInt(time.split(":")[0]) + 1}:${time.split(":")[1]}`
                );
              }}
              onEndTimeChange={setEndTime}
            />
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={handleClose} variant="outline">
              キャンセル
            </Button>
            <Button type="submit" colorScheme="blue">
              保存
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
