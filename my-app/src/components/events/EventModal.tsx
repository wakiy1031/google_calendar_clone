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
  Select,
  Option,
} from "@yamada-ui/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime?: string;
  onSave: (event: Omit<Event, "id">) => void;
}

export default function EventModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onSave,
}: EventModalProps) {
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const [startTime, setStartTime] = useState(selectedTime || "00:00");
  const [endTime, setEndTime] = useState(
    timeOptions[timeOptions.indexOf(startTime) + 1]
  );

  // selectedTimeが変更されたときにstartTimeを更新（初回のみ）
  useEffect(() => {
    if (selectedTime && timeOptions.includes(selectedTime)) {
      setStartTime(selectedTime);
      setEndTime(timeOptions[timeOptions.indexOf(selectedTime) + 1]);
    }
  }, [selectedTime]);

  // 終了時間の選択肢を取得（開始時間より後のみ）
  const getEndTimeOptions = () => {
    const startIndex = timeOptions.indexOf(startTime);
    return timeOptions.slice(startIndex + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSave({
      title: formData.get("title") as string,
      date: selectedDate,
      startTime,
      endTime,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <Input value={format(selectedDate, "yyyy/MM/dd")} readOnly />
          </FormControl>

          <div className="grid grid-cols-2 gap-4">
            <FormControl>
              <Label>開始時間</Label>
              <Select
                name="startTime"
                value={startTime}
                onChange={(value) => {
                  if (value) {
                    setStartTime(value);
                    setEndTime(timeOptions[timeOptions.indexOf(value) + 1]);
                  }
                }}
                items={timeOptions.slice(0, -1).map((time) => ({
                  label: time,
                  value: time,
                }))}
                required
              />
            </FormControl>

            <FormControl>
              <Label>終了時間</Label>
              <Select
                name="endTime"
                value={endTime}
                onChange={(value) => {
                  if (value) {
                    setEndTime(value);
                  }
                }}
                items={getEndTimeOptions().map((time) => ({
                  label: time,
                  value: time,
                }))}
                required
              />
            </FormControl>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={onClose} variant="outline">
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
