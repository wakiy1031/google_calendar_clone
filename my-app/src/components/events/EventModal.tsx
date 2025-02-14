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
  onUpdate?: (event: Event) => void;
  onDelete?: (id: string) => void;
  isMonthView?: boolean;
  event?: Event;
}

export default function EventModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onSave,
  onUpdate,
  onDelete,
  isMonthView = false,
  event,
}: EventModalProps) {
  const [showTimeSelect, setShowTimeSelect] = useState(!isMonthView);
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(currentDate);
  const [title, setTitle] = useState(event?.title || "");
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

  // eventが変更されたときに各フィールドを更新
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setCurrentDate(event.date);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setShowTimeSelect(
        !(event.startTime === "00:00" && event.endTime === "23:59")
      );
    }
  }, [event]);

  // モーダルが閉じられるときの処理
  const handleClose = () => {
    onClose();
    if (isMonthView) {
      setShowTimeSelect(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData = {
      title,
      date: currentDate,
      startTime: showTimeSelect ? startTime : "00:00",
      endTime: showTimeSelect ? endTime : "23:59",
    };

    if (event && onUpdate) {
      onUpdate({ ...eventData, id: event.id });
    } else {
      onSave(eventData);
    }
    handleClose();
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    setShowCalendar(false);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" height="55dvh">
      <ModalOverlay />
      <ModalBody overflow="none">
        <ModalHeader>{event ? "予定を編集" : "予定を追加"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <FormControl>
            <Label>タイトル</Label>
            <Input
              name="title"
              placeholder="予定のタイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
            {event && onDelete && (
              <Button
                type="button"
                onClick={handleDelete}
                colorScheme="red"
                variant="outline"
              >
                削除
              </Button>
            )}
            <div className="flex-grow" />
            <Button onClick={handleClose} variant="outline">
              キャンセル
            </Button>
            <Button type="submit" colorScheme="blue">
              {event ? "更新" : "保存"}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
