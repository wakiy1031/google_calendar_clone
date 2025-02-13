import { FormControl, Label, Select } from "@yamada-ui/react";

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export default function TimeSelector({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeSelectorProps) {
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const getEndTimeOptions = () => {
    const startIndex = timeOptions.indexOf(startTime);
    return timeOptions.slice(startIndex + 1);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormControl>
        <Label>開始時間</Label>
        <Select
          name="startTime"
          value={startTime}
          onChange={(value) => {
            if (value) {
              onStartTimeChange(value);
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
              onEndTimeChange(value);
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
  );
}
